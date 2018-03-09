//  视频播放首页轮播图
		var $imgs = $('.carousel .img-ct>li')
		var $prevBtn = $('.prev')
		var $nextBtn = $('.next')
		var $dot = $('.dot li')
		var $arrow = $('.arrow')	
		var imgLength = $imgs.length
		var imgWidth =$imgs.width()
		var pageIndex = 0	
		var timer = null	
		// 头尾克隆一个li 注意缓存的问题，
		$('.img-ct').append($imgs.first().clone())
		$('.img-ct').prepend($imgs.last().clone())	
		// 确定img-ct 的宽度以便后期扩展多张轮播图
		$('.img-ct').width((imgLength+2)*imgWidth)	
		//  设置第一页的位置
		$('.img-ct').css({left: -imgWidth})	
		//  点击按钮事件
		$prevBtn.click(function(){
			playPrev(1)
			
		})
		$nextBtn.click(function(){
			playNext(1)
	
		})	
		//  按钮事件函数
		function playNext(len){
			$('.img-ct').animate({
				left: '-='+len*imgWidth
			},function(){
				pageIndex+=len
				if(pageIndex === imgLength){
					pageIndex = 0
					$('.img-ct').css({left: -imgWidth})
				}
				console.log(pageIndex+'next')
				showDot()
			})
		}	
		function playPrev(len){
			$('.img-ct').animate({
				left: '+=' + len*imgWidth
			},function(){
				pageIndex-=len
				if(pageIndex < 0 ){
					pageIndex = imgLength-1
					$('.img-ct').css({left: -imgLength*imgWidth})
				}
				console.log(pageIndex)
				showDot()
			})
		}	
		//  显示点跟随函数
		function showDot(){
			console.log(pageIndex)
			$dot.removeClass('active')
			    .eq(pageIndex)
			    .addClass('active')
		}	
		//  点击点跟随函数
		$('.dot li').click(function(){
			var index = $(this).index()
			console.log(index+ 'dot')	
			if(index < pageIndex){
				playPrev(pageIndex-index)
			}else if(index > pageIndex){
				playNext(index-pageIndex)
			}
		})	
		//  自动播放定时器
		function playAuto(){
			 timer=setInterval(function(){
				playNext(1)
			},3500)
		}	
		playAuto()
		hideBtn()

		//  显示、隐藏按妞函数
		function showBtn(){
			$arrow.show()
		}
		function hideBtn(){
			$arrow.hide()
		}
		//  鼠标移入，移出效果

		$('.carousel').mouseenter(function(){
			clearInterval(timer)
			showBtn()
			console.log('stop')
		})
		$('.carousel').mouseleave(function(){
			playAuto()
			hideBtn()
			console.log('start')
		})