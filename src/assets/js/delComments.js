import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const delBtns = document.querySelectorAll(".fas.fa-trash-alt");
const commentCount = document.querySelector(".video__comment-number")


const commentCountDown = () => {
  const Num = parseInt(commentCount.innerText.replace(/[^0-9]/g,''))-1;
  commentCount.innerText = `댓글 ${Num}개`
}

const delComment = (target) => {
  const delBtn = target.parentElement;
  const div = delBtn.parentElement
  const li = div.parentElement
  commentList.removeChild(li);
  commentCountDown();
};

const handleClick = async event => {
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
      delComment(target);
    }
  };

const addEvent = () => {
    delBtns.forEach(function(el) {
        el.addEventListener("click", handleClick);
    })
  }

function init() {
    addEvent();
  }
  
  if (delBtns) {
    init();
  }