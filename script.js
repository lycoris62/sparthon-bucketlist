/** 이미지 */
const bgImage = new Image();
bgImage.src = "./Bucket_Plus.png";

// 페이지 로드 시 이전 상태 복원
document.addEventListener("DOMContentLoaded", (event) => {
  const buckets = document.querySelectorAll(".bucket");
  buckets.forEach((bucket, index) => {
    // 로컬 스토리지에서 상태 읽기
    const isDone = localStorage.getItem("bucket" + index) === "done";
    if (isDone) {
      bucket.classList.add("done");
    }
  });
});

// 버킷 리스트 클릭 이벤트
const buckets = document.querySelectorAll(".bucket");
buckets.forEach((bucket, index) => {
  bucket.addEventListener("click", function () {
    // 클래스 토글
    bucket.classList.toggle("done");

    // 로컬 스토리지에 상태 저장
    if (bucket.classList.contains("done")) {
      localStorage.setItem("bucket" + index, "done");
    } else {
      localStorage.setItem("bucket" + index, "");
    }
  });
});

const inputButton = document.querySelector(".input-btn");
inputButton.addEventListener("click", function () {
  const inputValue = document.querySelector(".input-value").value;

  const len = localStorage.length;

  const element = `
  <div class="todolist-div-${len}">
        <img class="delete-btn" src="./Delete.png" />
        <div class="bucket img${(localStorage.length % 6) + 1} center">${inputValue}</div>
      </div>
      `;

  const todolistWrap = document.querySelector(".todolist-wrap");
  todolistWrap.innerHTML = todolistWrap.innerHTML + element;
  localStorage.setItem(`bucket${localStorage.length}`, "");
  deleteClick();
});

function deleteClick() {
  // 삭제 클릭 이벤트
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", function () {
      // console.log(index);
      // console.log(`.todolist-div-${index}`);
      const todo = document.querySelector(`.todolist-div-${index}`);
      todo.remove();
      localStorage.removeItem("bucket" + index);
    });
  });
}

deleteClick();
