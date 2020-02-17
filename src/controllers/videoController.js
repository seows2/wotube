import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment"

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({
            _id: -1
        }).populate("creator");
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", video: [] });
    }
};




export const search = async (req, res) => {
    const {
        query: {
            term: searchingBy
        }
    } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title: {
                $regex: searchingBy,
                $options: "i"
            }
        });
    } catch (error) {
        console.log(error);
    }
    res.render("search", {
        pageTitle: "Search",
        searchingBy,
        videos
    });
};

export const getupload = (req, res) => {
    res.render("upload", {
        pageTitle: "Upload"
    });
}
export const postupload = async (req, res) => {
    const {
        body: {
            title,
            description
        },
        file: {
            location
        }
    } = req;
    const newVideo = await Video.create({
        fileURL: location,
        title,
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
}
export const videoDetail = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const video = await Video.findById(id)
        .populate("creator")
        .populate({
            path: "comment",
            populate: {
                path: "creator"
            }
        });
        video.views += 1;
        video.save();
        res.status(200);
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        res.redirect(routes.home);
    }

}
export const geteditVideo = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const video = await Video.findById(id);
        if(video.creator.toString() !== req.user.id){
            throw Error("error");
        } else {
            res.render("editVideo", {pageTitle: `Edit ${video.title}`, video })
        }
    } catch (error) {
        console.log(error)
        res.redirect(routes.home);
    }
}
export const posteditVideo = async (req, res) => {
    const {
        params: {
            id
        },
        body: {
            title,
            description
        }
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id}, {
            title,
            description
        });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
}
export const deleteVideo = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const video = await Video.findById(id);
        if(video.creator.toString() !== req.user.id){
            throw Error();
        } else {
            await Video.findOneAndRemove({
                _id: id
            });
        }
    } catch (error) {
        res.redirect(routes.home);
    }
    res.redirect(routes.home);
}

export const postRegisterView = async(req, res) =>{
    const {
        params : {id}
    } = req;
    try {
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
}


export const postAddComment = async(req, res) =>{
    const {
        params: {id},
        body: {comment},
        user
    } = req

    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id
        })
        video.comment.push(newComment.id);
        video.save();
        res.json(newComment);
        res.json(user);
    } catch (error) {
        res.status(400);
    }finally{
        res.end();
    }
}

export const deleteComment = async (req,res) => {
    const {
        params: {
            id
        }
    } = req;
    try{
    const comment = await Comment.findById(id);
    if(comment.creator.toString() !== req.user.id){
        throw Error();
    } else {
        await Comment.findOneAndRemove({
            _id: id
            });
        }
    }catch (error) {
        res.status(400);
    }finally{
        res.end()
    }
}