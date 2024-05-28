window.addEventListener('load',function(){
       
    waterFull(".main",'.box');

    //滚动加载 

 window.addEventListener('scroll',function(){

          if(reload(".box")){
                  let main = document.querySelector(".main");


                  //模拟数据
                  let eleArr = [
                      {imgUrl:'./img/pb/P_017.jpg'},
                      {imgUrl:'./img/pb/P_018.jpg'},
                      {imgUrl:'./img/pb/P_019.jpg'},
                      {imgUrl:'./img/pb/P_001.jpg'},
                      {imgUrl:'./img/pb/P_002.jpg'},
                      {imgUrl:'./img/pb/P_003.jpg'},
                      {imgUrl:'./img/pb/P_004.jpg'},
                      {imgUrl:'./img/pb/P_005.jpg'},
                      {imgUrl:'./img/pb/P_006.jpg'},
                  ];

                  //生成标签添加到页面

                  for(let i = 0;i<eleArr.length;i++){
                        let box = document.createElement("div");
                        box.classList.add("box");
                       
                        box.innerHTML = `
                                  <div class="imgs">
                                     <img src="${eleArr[i].imgUrl}">
                                  </div>
                           `

                        main.append(box);
                  }


                  //重新进行瀑布流布局
                  waterFull(".main",'.box');
          }
  })

  //监听页面变化
  window.addEventListener('resize',function(){

      waterFull(".main",'.box');
  
  })
})

/**
* @param {HTMLAllCollection} element
* @return {boolean}  
*/
function reload(element){
  let allItems = document.querySelectorAll(element);

  //获取滚动条的距离

  let scrolltop = document.documentElement.scrollTop;

  //获取可视区域的高度
  let clientHeight = document.documentElement.clientHeight;

  //获取最后一个盒子距离顶部的距离

  let lastItem = allItems[allItems.length - 1];

  let lastItemTop = lastItem.offsetTop;

  //页面高度
  let pageHeight = clientHeight + scrolltop;

  return lastItemTop<pageHeight?true:false

}

/**
* 获取最小的元素
* @param {Array} arr
* @return {number} min   
*/
function minElement(arr){
  let min =  arr[0];

  for(let i = 0;i<arr.length;i++){
      if(arr[i]<min){
          min = arr[i];
      }
  }

  return min;
}

/**
* 瀑布流布局
* 
* @param {string} main 
* @param {string} allItem 
* @return void
*/

function waterFull(main,allItem){
  let mains = document.querySelector(main);
  let allItems = document.querySelectorAll(allItem);

  //获取一个子盒子的宽度
  let boxWidth = allItems[0].offsetWidth;

  //获取可视区域的宽度
  let pageX = document.documentElement.clientWidth;

  //求出列数
  let cols = Math.floor(pageX/boxWidth);

  //让父元素居中
  mains.style.width = boxWidth*cols+"px";
  mains.style.margin = "0 auto";

  //定位子元素
  let heightArr = [], boxHeight = 0,minBoxHeight = 0,minBoxIndex = 0;

  for(let i = 0;i<allItems.length;i++){

      boxHeight = allItems[i].offsetHeight;

       if(i < cols){
           heightArr.push(boxHeight);
           allItems[i].style.position = "static";
       }else{
            
             //找出高度最低的盒子
             minBoxHeight = minElement(heightArr);

             //取出高度最低盒子在数组中的index
             minBoxIndex = heightArr.indexOf(minBoxHeight);

             //剩余盒子定位
             allItems[i].style.position = 'absolute';
             allItems[i].style.left = minBoxIndex*boxWidth+"px";
             allItems[i].style.top = minBoxHeight+"px";


             //更新高度
             heightArr[minBoxIndex] += boxHeight; 
       } 
  }
}