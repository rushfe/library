const library = document.getElementById("library");
const addBookBtn = document.getElementById("addBookBtn");
const addTitle = document.getElementById("addTitle");
const addAuthor = document.getElementById("addAuthor");
const addPages = document.getElementById("addPages");
const statusSelect = document.getElementById("statusSelect");
const deleteBtns = library.getElementsByTagName("button");
//进入初始化加载
window.onload = function () {
  display();
};
//存放数据的数组
let myLibrary = [
  { title: "在人间", author: "高尔基", pages: 392, read: false },
  { title: "三体", author: "刘慈欣", pages: 1283, read: false },
  { title: "平原上的摩西", author: "双雪涛", pages: 288, read: true },
];
//移除book
function deleteBookFromLibrary(title) {
  //去掉title一致的
  myLibrary = myLibrary.filter((book) => book.title !== title);
  display();
}

//book对象构造函数
function Book(title, author, pages, read, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;
}
//显示数组信息到页面
function display() {
  //reset
  library.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    library.innerHTML += `<div><p>${myLibrary[i].title}</p><p>作者：${
      myLibrary[i].author
    }</p><p>页数：${myLibrary[i].pages}</p>
      <button type="button">${myLibrary[i].read ? "已读" : "未读"}</button>
      <button type="button">删除</button>
      </div>`;
  }
  //每个按钮添加点击事件
  for (let i = 0; i < deleteBtns.length; i++) {
    if (i % 2 == 1) {
      deleteBtns[i].onclick = function () {
        let title = this.parentNode.firstChild.innerText;
        deleteBookFromLibrary(title);
      };
    }else{
        //已读/未读的切换点击事件
        deleteBtns[i].onclick = function(){
            myLibrary.forEach(book=>{
                //判断是点到哪个按钮
                if(book.title===this.parentNode.firstChild.innerText){
                    book.read = !book.read;
                }
            })
            display();
        }
    }
  }
}

//添加新book到数组
function addBookToLibrary(book) {
  //将新book放入数组
  myLibrary.push(book);
  //重置library标签
  library.innerHTML = "";
  //展示
  display();
}

//点击添加按钮后
addBookBtn.onclick = () => {
  //判断书名是否重复
  for (let item of myLibrary) {
    if (item.title === addTitle.value) {
      alert("书名重复");
      return;
    }
  }
  //判断值是否为空
  if (addTitle.value && addAuthor.value && addPages.value) {
    newBook = new Book(
      addTitle.value,
      addAuthor.value,
      addPages.value,
      statusSelect.value === 1 ? true : false
    );
    addBookToLibrary(newBook);
  }
};
