/*******************************************************************
*
* File    : JSFX_ImageFlag.js © JavaScript-FX.com
*
* Created : 2001/03/17
*
* Author  : Roy Whittle www.Roy.Whittle.com
*           
* Purpose : To create an animated ImageFlag that follows the cursor
*
* History
* Date         Version        Description
*
* 2001-03-17	2.0		Converted for javascript-fx
***********************************************************************/
if(!window.JSFX)
	JSFX = new Object();

JSFX.ImageFlag = function(img, w,h)
{
	this.gap   		= w/16;
	this.h		= h;
	this.w		= w;
	this.angle		= 0;
	this.radiusX 	= 4;
	this.radiusY 	= 2;
	this.followMode 	= 0;

	this.imgArray=new Array();

	for(i=0 ; i<45 ; i++){
		this.imgArray[i] = new JSFX.Layer("<IMG SRC='"+img
						+ "' WIDTH='" + w
						+ "' HEIGHT='" + h
						+ "'>", 
						i*this.gap, 
						100);
		this.imgArray[i].clip(i*this.gap,0,(i+1)*this.gap+this.radiusX,h);
		this.imgArray[i].show();
	}
}
JSFX.ImageFlag.prototype.setRadius = function(rx, ry)
{
	this.radiusX 	= rx;
	this.radiusY 	= ry;
	for(i=0 ; i<16 ; i++){
		this.imgArray[i].clip(i*this.gap,0,(i+1)*this.gap+this.radiusX,this.h);
	}
}
JSFX.ImageFlag.prototype.animate = function()
{
	this.angle += 0.5;
	locX = this.radiusX*Math.cos(this.angle);	
	locY = this.radiusY*Math.sin(this.angle);	

	for(i=this.imgArray.length-1; i>0 ; i--){
		this.imgArray[i].moveTo(this.imgArray[i-1].getX(), this.imgArray[i-1].getY());
	}

	if(this.followMode == 0)
	{
		var x1=this.imgArray[0].getX();
		var y1=this.imgArray[0].getY();
		x1 += ((JSFX.Browser.mouseX-x1)/10) +locX+2;
		y1 += ((JSFX.Browser.mouseY-y1)/10) +locY-2;
		this.imgArray[0].moveTo(x1, y1);
	}
	else
		this.imgArray[0].moveTo(JSFX.Browser.mouseX+(locX+20), JSFX.Browser.mouseY+(locY-10));
}


JSFX.MakeImageFlag = function(img,w,h)
{
	var ImageFlag = new JSFX.ImageFlag(img,w,h);
	JSFX.MakeImageFlag.flags[JSFX.MakeImageFlag.flags.length] = ImageFlag;

	if(!JSFX.MakeImageFlag.theTimer)
		JSFX.MakeImageFlag.theTimer = setInterval("JSFX.MakeImageFlag.animate()", 50);

	return(ImageFlag);
}
JSFX.MakeImageFlag.flags= new Array();
JSFX.MakeImageFlag.animate = function()
{
	var i;
	for(i=0 ; i<JSFX.MakeImageFlag.flags.length ; i++)
		JSFX.MakeImageFlag.flags[i].animate();
}

/*** If no other script has added it yet, add the ns resize fix ***/
if(navigator.appName.indexOf("Netscape") != -1 && !document.getElementById)
{
	if(!JSFX.ns_resize)
	{
		JSFX.ow = outerWidth;
		JSFX.oh = outerHeight;
		JSFX.ns_resize = function()
		{
			if(outerWidth != JSFX.ow || outerHeight != JSFX.oh )
				location.reload();
		}
	}
	window.onresize=JSFX.ns_resize;
}