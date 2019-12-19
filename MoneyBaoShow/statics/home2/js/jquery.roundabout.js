jQuery.extend({roundabout_shape:{def:'lazySusan',lazySusan:function(r,a,t){return{x:Math.sin(r+a),y:(Math.sin(r+3*Math.PI/2+a)/8)*t,z:(Math.cos(r+a)+1)/2,scale:(Math.sin(r+Math.PI/2+a)/2)+0.5}}}});jQuery.fn.roundabout=function(){var options=(typeof arguments[0]!='object')?{}:arguments[0];options={bearing:(typeof options.bearing=='undefined')?0.0:parseFloat(options.bearing%360.0,4),tilt:(typeof options.tilt=='undefined')?0.0:parseFloat(options.tilt,4),minZ:(typeof options.minZ=='undefined')?100:parseInt(options.minZ,10),maxZ:(typeof options.maxZ=='undefined')?400:parseInt(options.maxZ,10),minOpacity:(typeof options.minOpacity=='undefined')?0.40:parseFloat(options.minOpacity,2),maxOpacity:(typeof options.maxOpacity=='undefined')?1.00:parseFloat(options.maxOpacity,2),minScale:(typeof options.minScale=='undefined')?0.40:parseFloat(options.minScale,2),maxScale:(typeof options.maxScale=='undefined')?1.00:parseFloat(options.maxScale,2),duration:(typeof options.duration=='undefined')?600:parseInt(options.duration,10),btnNext:options.btnNext||null,btnPrev:options.btnPrev||null,easing:options.easing||'swing',clickToFocus:(options.clickToFocus!==false),focusBearing:(typeof options.focusBearing=='undefined')?0.0:parseFloat(options.focusBearing%360.0,4),shape:options.shape||'lazySusan',debug:options.debug||false,childSelector:options.childSelector||'li',startingChild:(typeof options.startingChild=='undefined')?null:parseInt(options.startingChild,10)};this.each(function(i){var ref=jQuery(this);var childSelector=options.childSelector;var children=ref.children(childSelector);var period=360.0/children.length;var startingBearing=(options.startingChild===null)?options.bearing:options.startingChild*period;ref.addClass('roundabout-holder').css('padding',0).css('position','relative').css('z-index',options.minZ).attr('bearing',startingBearing).attr('tilt',options.tilt).attr('minZ',options.minZ).attr('maxZ',options.maxZ).attr('minOpacity',options.minOpacity).attr('maxOpacity',options.maxOpacity).attr('minScale',options.minScale).attr('maxScale',options.maxScale).attr('duration',options.duration).attr('easing',options.easing).attr('clickToFocus',options.clickToFocus).attr('focusBearing',options.focusBearing).attr('animating','0').attr('childInFocus',-1).attr('shape',options.shape).attr('period',period).attr('debug',options.debug).attr('childSelector',options.childSelector);children.each(function(i){var degrees=period*i;var startPos;jQuery(this).addClass('roundabout-moveable-item').css('position','absolute').attr('degrees',degrees);startPos=[jQuery(this).width(),jQuery(this).height(),parseInt(jQuery(this).css('font-size'),10)];jQuery(this).attr('startPos',startPos.join(','));if(options.clickToFocus===true){jQuery(this).click(function(e){if(!jQuery.roundabout_isInFocus(ref,degrees)){e.preventDefault();if(ref.attr('animating')=='0'){ref.roundabout_animateAngleToFocus(degrees)}return false}})}});if(options.btnNext){jQuery(options.btnNext).click(function(e){e.preventDefault();if(ref.attr('animating')=='0'){ref.roundabout_animateToNextChild()}return false})}if(options.btnPrev){jQuery(options.btnPrev).click(function(e){e.preventDefault();if(ref.attr('animating')=='0'){ref.roundabout_animateToPreviousChild()}return false})}ref.roundabout_updateChildPositions()});return this};jQuery.fn.roundabout_setTilt=function(newTilt){this.each(function(i){jQuery(this).attr('tilt',newTilt);jQuery(this).roundabout_updateChildPositions()});return this};jQuery.fn.roundabout_setBearing=function(newBearing){this.each(function(i){jQuery(this).attr('bearing',parseFloat(newBearing%360,4));jQuery(this).roundabout_updateChildPositions()});if(typeof arguments[1]==='function'){var callback=arguments[1];setTimeout(function(){callback()},0)}return this};jQuery.fn.roundabout_adjustBearing=function(delta){delta=parseFloat(delta,4);if(delta!==0){this.each(function(i){jQuery(this).attr('bearing',jQuery.roundabout_getBearing(jQuery(this))+delta);jQuery(this).roundabout_updateChildPositions()})}return this};jQuery.fn.roundabout_adjustTilt=function(delta){delta=parseFloat(delta,4);this.each(function(i){jQuery(this).attr('tilt',parseFloat(jQuery(this).attr('tilt'),4)+delta);jQuery(this).roundabout_updateChildPositions()});return this};jQuery.fn.roundabout_animateToBearing=function(bearing){bearing=parseFloat(bearing,4);var currentTime=new Date();var data=(typeof arguments[3]!=='object')?null:arguments[3];var duration=(typeof arguments[1]=='undefined')?null:arguments[1];var easingType=(typeof arguments[2]!='undefined')?arguments[2]:null;this.each(function(i){var ref=jQuery(this),timer,easingFn,newBearing;var thisDuration=(duration===null)?parseInt(ref.attr('duration'),10):duration;var thisEasingType=(easingType!==null)?easingType:ref.attr('easing')||'swing';if(data===null){data={timerStart:currentTime,start:jQuery.roundabout_getBearing(ref),totalTime:thisDuration}}timer=currentTime-data.timerStart;if(timer<thisDuration){ref.attr('animating','1');if(typeof jQuery.easing.def=='string'){easingFn=jQuery.easing[thisEasingType]||jQuery.easing[jQuery.easing.def];newBearing=easingFn(null,timer,data.start,bearing-data.start,data.totalTime)}else{newBearing=jQuery.easing[thisEasingType]((timer/data.totalTime),timer,data.start,bearing-data.start,data.totalTime)}ref.roundabout_setBearing(newBearing,function(){ref.roundabout_animateToBearing(bearing,thisDuration,thisEasingType,data)})}else{bearing=(bearing<0)?bearing+360:bearing%360;ref.attr('animating','0');ref.roundabout_setBearing(bearing)}});return this};jQuery.fn.roundabout_animateToDelta=function(delta){var duration,easing;if(typeof arguments[1]!=='undefined'){duration=arguments[1]}if(typeof arguments[2]!=='undefined'){easing=arguments[2]}this.each(function(i){delta=jQuery.roundabout_getBearing(jQuery(this))+delta;jQuery(this).roundabout_animateToBearing(delta,duration,easing)});return this};jQuery.fn.roundabout_animateToChild=function(childPos){var duration,easing;if(typeof arguments[1]!=='undefined'){duration=arguments[1]}if(typeof arguments[2]!=='undefined'){easing=arguments[2]}this.each(function(i){var ref=jQuery(this);if(parseInt(ref.attr('childInFocus'),10)!==childPos&&ref.attr('animating','0')){var child=jQuery(ref.children(ref.attr('childSelector'))[childPos]);ref.roundabout_animateAngleToFocus(parseFloat(child.attr('degrees'),4),duration,easing)}});return this};jQuery.fn.roundabout_animateToNextChild=function(){var duration,easing;if(typeof arguments[0]!=='undefined'){duration=arguments[0]}if(typeof arguments[1]!=='undefined'){easing=arguments[1]}this.each(function(i){if(jQuery(this).attr('animating','0')){var bearing=360.0-jQuery.roundabout_getBearing(jQuery(this));var period=parseFloat(jQuery(this).attr('period'),4),j=0,range;while(true){range={lower:period*j,upper:period*(j+1)};if(bearing<=range.upper&&bearing>range.lower){jQuery(this).roundabout_animateToDelta(bearing-range.lower,duration,easing);break}j++}}});return this};jQuery.fn.roundabout_animateToPreviousChild=function(){var duration,easing;if(typeof arguments[0]!=='undefined'){duration=arguments[0]}if(typeof arguments[1]!=='undefined'){easing=arguments[1]}this.each(function(i){if(jQuery(this).attr('animating','0')){var bearing=360.0-jQuery.roundabout_getBearing(jQuery(this));var period=parseFloat(jQuery(this).attr('period'),4),j=0,range;while(true){range={lower:period*j,upper:period*(j+1)};if(bearing>=range.lower&&bearing<range.upper){jQuery(this).roundabout_animateToDelta(bearing-range.upper,duration,easing);break}j++}}});return this};jQuery.fn.roundabout_animateAngleToFocus=function(target){var duration,easing;if(typeof arguments[1]!=='undefined'){duration=arguments[1]}if(typeof arguments[2]!=='undefined'){easing=arguments[2]}this.each(function(i){var delta=jQuery.roundabout_getBearing(jQuery(this))-target;delta=(Math.abs(360.0-delta)<Math.abs(0.0-delta))?360.0-delta:0.0-delta;delta=(delta>180)?-(360.0-delta):delta;if(delta!==0){jQuery(this).roundabout_animateToDelta(delta,duration,easing)}});return this};jQuery.fn.roundabout_updateChildPositions=function(){this.each(function(i){var ref=jQuery(this);var inFocus=-1;var data={bearing:jQuery.roundabout_getBearing(ref),tilt:parseFloat(ref.attr('tilt'),4),stage:{width:Math.floor(ref.width()*0.9),height:Math.floor(ref.height()*0.9)},animating:ref.attr('animating'),inFocus:parseInt(ref.attr('childInFocus'),10),focusBearingRad:jQuery.roundabout_degToRad(parseFloat(ref.attr('focusBearing'),4)),shape:jQuery.roundabout_shape[ref.attr('shape')]||jQuery.roundabout_shape[jQuery.roundabout_shape.def]};data.midStage={width:data.stage.width/2,height:data.stage.height/2};data.nudge={width:data.midStage.width+data.stage.width*0.05,height:data.midStage.height+data.stage.height*0.05};data.zValues={min:parseInt(ref.attr('minZ'),10),max:parseInt(ref.attr('maxZ'),10)};data.zValues.diff=data.zValues.max-data.zValues.min;data.opacity={min:parseFloat(ref.attr('minOpacity'),2),max:parseFloat(ref.attr('maxOpacity'),2)};data.opacity.diff=data.opacity.max-data.opacity.min;data.scale={min:parseFloat(ref.attr('minScale'),2),max:parseFloat(ref.attr('maxScale'),2)};data.scale.diff=data.scale.max-data.scale.min;ref.children(ref.attr('childSelector')).each(function(i){if(jQuery.roundabout_updateChildPosition(jQuery(this),ref,data,i)&&data.animating=='0'){inFocus=i;jQuery(this).addClass('roundabout-in-focus')}else{jQuery(this).removeClass('roundabout-in-focus')}});if(inFocus!==data.inFocus){jQuery.roundabout_triggerEvent(ref,data.inFocus,'blur');if(inFocus!==-1){jQuery.roundabout_triggerEvent(ref,inFocus,'focus')}ref.attr('childInFocus',inFocus)}});return this};jQuery.roundabout_getBearing=function(el){return parseFloat(el.attr('bearing'),4)%360};jQuery.roundabout_degToRad=function(degrees){return(degrees%360.0)*Math.PI/180.0};jQuery.roundabout_isInFocus=function(el,target){return(jQuery.roundabout_getBearing(el)%360===(target%360))};jQuery.roundabout_triggerEvent=function(el,child,eventType){return(child<0)?this:jQuery(el.children(el.attr('childSelector'))[child]).trigger(eventType)};jQuery.roundabout_updateChildPosition=function(child,container,data,childPos){var ref=jQuery(child),out=[];var startPos=ref.attr('startPos').split(',');var itemData={startWidth:startPos[0],startHeight:startPos[1],startFontSize:startPos[2],degrees:parseFloat(ref.attr('degrees'),4)};var rad=jQuery.roundabout_degToRad((360.0-itemData.degrees)+data.bearing);while(rad<0){rad=rad+Math.PI*2}while(rad>Math.PI*2){rad=rad-Math.PI*2}var factors=data.shape(rad,data.focusBearingRad,data.tilt);factors.scale=(factors.scale>1)?1:factors.scale;factors.adjustedScale=(data.scale.min+(data.scale.diff*factors.scale)).toFixed(4);factors.width=factors.adjustedScale*itemData.startWidth;factors.height=factors.adjustedScale*itemData.startHeight;ref.css('left',((factors.x*data.midStage.width+data.nudge.width)-factors.width/2.0).toFixed(2)+'px').css('top',((factors.y*data.midStage.height+data.nudge.height)-factors.height/2.0).toFixed(2)+'px').css('width',factors.width.toFixed(2)+'px').css('height',factors.height.toFixed(2)+'px').css('opacity',1).css('z-index',parseInt(data.zValues.min+(data.zValues.diff*factors.z),10)).css('font-size',(factors.adjustedScale*itemData.startFontSize).toFixed(2)+'px').attr('current-scale',factors.adjustedScale);if(container.attr('debug')=='true'){out.push('<div style="font-weight: normal; font-size: 10px; padding: 2px; width: '+ref.css('width')+'; background-color: #ffc;">');out.push('<strong style="font-size: 12px; white-space: nowrap;">Child '+childPos+'</strong><br />');out.push('<strong>left:</strong> '+ref.css('left')+'<br /><strong>top:</strong> '+ref.css('top')+'<br />');out.push('<strong>width:</strong> '+ref.css('width')+'<br /><strong>opacity:</strong> '+ref.css('opacity')+'<br />');out.push('<strong>z-index:</strong> '+ref.css('z-index')+'<br /><strong>font-size:</strong> '+ref.css('font-size')+'<br />');out.push('<strong>scale:</strong> '+ref.attr('current-scale'));out.push('</div>');ref.html(out.join(''))}return jQuery.roundabout_isInFocus(container,itemData.degrees)};