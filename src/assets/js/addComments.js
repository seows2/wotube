import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentCount = document.querySelector(".video__comment-number")

const commentCountDown = () => {
    const Num = parseInt(commentCount.innerText.replace(/[^0-9]/g,''))-1;
    commentCount.innerText = `댓글 ${Num}개`
}
const commentCountUp = () => {
    const Num = parseInt(commentCount.innerText.replace(/[^0-9]/g,''))+1;
    commentCount.innerText = `댓글 ${Num}개`

}
const deleteComment = async (event) => {
    const target = event.target;
    const commentId = target.id;
    const response = await axios({
        url: `/api/${commentId}/delete`,
        method: "POST",
        data: {
            commentId
        }
    });
  if (response.status === 200) {
    const delBtn = target.parentElement;

    const li = delBtn.parentElement
    commentList.removeChild(li);
    commentCountDown();
  }
}

const addComment = (comment,delBtnId) => {
    const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("i");
  span.innerText = comment;
  delBtn.id = String(delBtnId);
  delBtn.className = "fas fa-trash-alt";
  delBtn.addEventListener("click", deleteComment);
  span.appendChild(delBtn);
  li.appendChild(span);
  commentList.prepend(li);
  commentCountUp();
}

const sendComment = async (comment) =>{
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method:"POST",
        data: {
            comment
        }
    })
    if(response.status === 200){
        addComment(comment,response.data._id);
    }
}


const handleSubmit = (event) => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";

}

function init(){
    addCommentForm.addEventListener("submit", handleSubmit)
}

if(addCommentForm){
    init();
}