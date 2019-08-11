import axios from "axios";
const addComentForm = document.getElementById("jsAddComment");

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
            comment
        }
    });
    console.log(response);
}

function init(){
    addComentForm.addEventListener("submit" , handleSubmit);
}

if(addComentForm){
    init();
}