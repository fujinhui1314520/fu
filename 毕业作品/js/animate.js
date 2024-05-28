function buffer(obj,elementObj,fn){
        
    clearInterval(obj.timer);

       let speed = 0,begin = null,target = 0,flag = false;

      obj.timer = setInterval(function(){
          
           flag = true;

          for(let key in elementObj){
                //获取属性

              if(key === 'opacity'){
                begin =   getStyleAttr(obj,key)*100;
               target =  elementObj[key]*100;
              }else{
                begin =  parseInt(getStyleAttr(obj,key));
                target =  parseInt(elementObj[key]);
              }

              
        
             //得到速度
             speed = (target - begin)*0.2;
             speed =  target > begin ? Math.ceil(speed):Math.floor(speed);

              
               if(key === 'opacity'){

                   obj.style.opacity = (begin+speed)/100;

               }else{

                   obj.style[key] = begin + speed+"px";

               }

              
                //到达目标值停下
                if(begin !== target){
                    flag = false;
                }
          }

          //清除定时器

          if(flag){
              clearInterval(obj.timer);

              //回到函数执行

            //    if(fn){
            //        fn();
            //    }

                 fn && fn();
          }

            
           
      },30) 
}


function getStyleAttr(obj,ele){
    if(obj.currentStyle){
        return obj.currentStyle[ele];
    }else{
        return window.getComputedStyle(obj,null)[ele];
    }
}