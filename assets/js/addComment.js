import axios from "axios";
const removeCommentBtns = document.getElementsByClassName("fa-times");
const addComentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

//Remove Comment*****************************************************************
function frontendRemoveComment(){
    this.parentNode.style.display= "none";
    decreaseNumber();
}

function decreaseNumber(){
    commentNumber.innerHTML = parseInt(commentNumber.innerText, 10) - 1;
}

async function handleRemoveComment(){
    const commentId = this.previousSibling.value;
    const response  = await axios({
        url : `/api/${commentId}/removeComment`, 
        //url로 아이디값 보내서 req.params로 삭제할거라
        //data는 따로 명시안함
        method : "POST"
    });

    if(response.status === 200){
        frontendRemoveComment.call(this);
    }
}

//Add Comment*****************************************************************
//페이지 새로고침 실시간 댓글 추가 기능처럼 보이는 fake 임 
const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const i = document.createElement("i");

    i.className ="fa fa-times";
    span.innerHTML = comment;
    span.appendChild(i);
    li.appendChild(span);
    commentList.prepend(li);
    increaseNumber();   
}

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerText, 10) + 1;
}

const handleSubmit = (event) => {
    event.preventDefault(); // 이벤트 막음 새로고침x
    const commentInput =
        addComentForm.querySelector("input");
    
    const comment = commentInput.value;
    if(comment.length !== 0){
        sendComment(comment);
    }else{
        alert("Please input comment");
    }
    
    commentInput.value = "";

}

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response  = await axios({
        url : `/api/${videoId}/comment`,
        method : "POST",
        data : {
            comment //body에  comment로 들어감
        }
    });

    if(response.status === 200){
        addComment(comment);
    }
}

function init(){
    addComentForm.addEventListener("submit" , handleSubmit);
    Array.prototype.forEach.call(removeCommentBtns, (btn)=> {
        btn.addEventListener("click" , handleRemoveComment);
    });
}

if(addComentForm){
    init();
}