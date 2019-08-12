import axios from "axios";
const removeCommentBtns = document.getElementsByClassName("fa-times");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

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
        method : "POST",
    });

    if(response.status === 200){
        frontendRemoveComment.call(this);
    }
}

// const handleRemoveComment = async ()=> {
//     const commentId = this.previousSibling.value;
//     const response  = await axios({
//         url : `/api/${commentId}/removeComment`,
//         method : "POST",
//     });

//     if(response.status === 200){
//        console.log("remove Comment ===> ");
//         // removeComment(commentId);
//     }

//     console.log(response);
// }


function init(){
    Array.prototype.forEach.call(removeCommentBtns, (btn)=> {
        btn.addEventListener("click" , handleRemoveComment);
    });

}

if(commentList){
    init();
}