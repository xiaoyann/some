function SimpleSlide ( options ) {
	// 上一张
	var ctrlPrev = $(options.ctrlPrev)
	// 下一张
	var ctrlNext = $(options.ctrlNext)
	// 滑动器
	var sliderElem = $(options.sliderElem)
	// 每次滑动的宽度
	var unitSliding = options.unitSliding * -1
	// 总共多少张
	var totalSlide = sliderElem.children().length
	// 最多能滑动多少次
	var maxTime = totalSlide - options.showSlide
	// 剩余多少次
	var remainTime = maxTime
	// 滑动的速度
	var iSpeed = options.iSpeed || 500
	//  自动滑动速度
	var autoSlidingSpeed = options.autoSlidingSpeed || 1000 
	// 上一次点击时间
	var lastClickTime = 0
	//  自动滑动定时器
	var autoTimer

	// 纠正sliderElem的宽度
	sliderElem.css('width', Math.abs(totalSlide * unitSliding))

	ctrlPrev.on('click', function() {
		handler('prev')
	})
	ctrlNext.on('click', function() {
		handler('next')
	})

	// 是否开启自动滑动
	if (options.autoSliding === true) {
		autoSliding()
		// 关闭自动滑动
		sliderElem.mouseover( stopAutoSliding )
		ctrlPrev.mouseover( stopAutoSliding )
		ctrlNext.mouseover( stopAutoSliding )
		// 开启自动滑动
		sliderElem.mouseout( autoSliding )
		ctrlPrev.mouseout( autoSliding )
		ctrlNext.mouseout( autoSliding )
	}

	function handler( direction ) {
		var nowTime = new Date().getTime()
		// 限制狂点
		if (nowTime - lastClickTime < iSpeed) { return }
		// 更新上次点击时间
		lastClickTime = nowTime

		sliding( direction )
	}

	// 执行滑动
	function sliding( direction ) {
		if (direction === 'prev') {
			if (remainTime > 0) {
				remainTime--
			} else {
				return false
			}
		} else if (direction === 'next') {
			if (remainTime < maxTime) {
				remainTime++
			} else {
				return false
			}
		} else {
			return false
		}
		
		sliderElem.animate({
			left: (maxTime - remainTime) * unitSliding
		}, iSpeed)
	}

	// 自动滑动
	function autoSliding() {
		var direction = 'prev'
		autoTimer = setInterval(function() {
			sliding( direction )
			if (remainTime === 0) {
				direction = 'next'
			} else if (remainTime === maxTime) {
				direction = 'prev'
			}
		}, autoSlidingSpeed)
	}

	// 清除定时器 停止自动滑动
	function stopAutoSliding() {
		clearInterval( autoTimer )
	}
}


/*   
SimpleSlide({
	// 滑动器 
	sliderElem: '.slider-main',
	// 每次滑动的宽度
	unitSliding: '170',
	// 显示多少张
	showSlide: '4',

	// 上一个按钮 可选
	ctrlPrev: '#slider-ctrlPrev',
	// 下一个按钮 可选
	ctrlNext: '#slider-ctrlNext',
	
	// 是否自动滑动 可选
	autoSliding: false,
	// 自动滑动的速度 可选
	autoSlidingSpeed: 2000,
	// 滑动速度 可选
	iSpeed: 500
})
*/








