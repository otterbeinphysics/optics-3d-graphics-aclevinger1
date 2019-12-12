// Code put here is executed as the page is loading.
// Use this area to initialize global variables.

var gViewport = null;
var ctx = null;
var gWidth = null;
var gHeight = null;



var gT = 0; 		// This will always be set to the current time-since-page-load, in ms
var gdT = 50; 		// This will always be set to the current time-since-last frame, (but capped at something reasonable)
var g_last_frame_t = Date.now();

var gBoxSize;
var gMyCheckbox;
var gCtl2;

var gContinuousRedraw = true;

$(function(){
	// Code in this block is executated when the page first loads.

	// This sort of line can be put anywhere: it doesn't show up on the page, but shows up in the "Console"
	// To see your console:
	// On chrome: View / Developer / Javascript Console    (or command-option-j or control-option-j)
	// On firefox: Tools / Web Developer / Web Console
	// Tools also in other browers, but I recommend using one of the two above.
	// Note that you can also issue commands in the console, just like the code here!

	console.log("Hello there intrepid programmer!");

	// This is where you set up your controls.  The name of your control (id="myID") is controlled by attaching 
	// an event hook to #myID

	// How to use an input box:
	gBoxSize = parseInt($('#boxsize').val()); // initialize it

	$('#boxsize').change(function(){
		// This code is run when someone changes the content of the text box.
		gBoxSize = parseInt($(this).val());
		console.log("Changing text box size to",gBoxSize)
	})

	// The check box
	gMyCheckbox = $("#checkbox1").is(":checked");
	$("#checkbox1").change(function(){
		gMyCheckbox = $(this).is(":checked");
		console.log("checkbox is now",gMyCheckbox);
	})

	// The clickable box
	$("#ctl1").click(function(){
		console.log("ctl1 was clicked");
	});

	// The holdable box
	gCtl2 = false;
	$("#ctl2").mousedown(function(){
		console.log("ctl2 was pushed");
		gCtl2 = true;
	});
	$(window).mouseup(function(){ // this is on the whole window in case user's mouse moves off of button while holding it down.
		if(gCtl2){
			console.log("ctl2 was released");
			gCtl2 = false;
		}
	});


	// Set up the view
	gViewport = $('#viewport');
	ctx = gViewport.get(0).getContext('2d');
	gWidth = gViewport.get(0).width = gViewport.innerWidth();
	gHeight = gViewport.get(0).height =gViewport.innerHeight();

	// Set the canvas coordinates up so that the origin is in the center of the viewport
	ctx.translate(gWidth/2,gHeight/2);

	DummyExample();

	// This draws once.
	AnimationFrame();



})

var last_frame = Date.now();
var t0 = Date.now();


function SetTime()
{
	// this function sets the global values gT and gdT to be the time since page update
}

function AnimationFrame()
{
	// This routine gets called every time a new frame happens.

	//	Some utility code in case you want to make animations:
	const max_dt = 50;
	var now = Date.now();
	var dt = now - g_last_frame_t;
	g_last_frame_t = now;
	gdT = Math.min(dt,max_dt); // Call the callback function, give it the time delta.
	gT += gdT;
	$("#time").text(gT);
	$("#fps").text((1000/dt).toFixed(1));

	// Execute your code

	Draw();


	if(gContinuousRedraw) requestAnimationFrame(AnimationFrame);  // Ask the browser to call this function again when it's ready for another frame.
	// If you set gContinuousRedraw to false, it will stop doing this (which will save energy on your computer, but the display won't update unless you call AnimationFrame() manually)
}


function Draw()
{

	// Here's where you will draw things!
	Clear(); // Clear the viewport; code below.

	// Note that in this projection, x is RIGHT, y is DOWN (not up!)
	
	
	speed = 0.001;
	omega = .001;
	DrawCube(100,omega,speed,speed,speed,4*Math.random()|0);
	DrawCube(100,omega,speed, speed, -speed,4*Math.random()|0);
	DrawCube(100,omega,speed,-speed,-speed,4*Math.random())|0;
	DrawCube(100,omega,-speed,-speed,-speed,4*Math.random()|0);
	DrawCube(100,omega,-speed,speed,speed,4*Math.random()|0);
	DrawCube(100,omega,-speed,speed,-speed,4*Math.random()|0);
	DrawCube(100,omega,-speed,-speed,speed,4*Math.random()|0);
	DrawCube(100,omega,speed,-speed,speed,4*Math.random()|0);
	DrawCube(100,omega,0,0,0,4*Math.random()|0);
	

		
		
	



	if(gMyCheckbox) DrawCube(Math.random()*200,100,.0001,.0001,.0001);
		
		
	
		
}


function Clear()
{
	// Clears the viewport.
	ctx.fillStyle="white"; 
	ctx.fillRect(-gWidth/2, -gHeight/2, gWidth, gHeight);  // from xy to deltax, deltay
}

function DrawBox(x,y,size)
{
	// Sample code to show some simple draw commands in 2d
	ctx.strokeStyle = "red";  
	ctx.lineWidth = 2;  // thickish lines
	var pi = Math.PI;


	var x1 = x;
	var y1 = y;

	var x2 = (x1+size) * Math.cos(pi/12) + y1 * Math.sin(pi/12);
	var y2 = y1 * Math.cos(pi/12) - x1 * Math.sin(pi/12);

	var x3 = (x1+size) * Math.cos(pi/12) + (y1+size) * Math.sin(pi/12);
	var y3 = (y1 + size) * Math.cos(pi/12) - (x1+size) * Math.sin(pi/12);

	var x4 = (x1 + size) * Math.cos(pi/12) + y1* Math.sin(pi/12);
	var y4 = (y1 + size) * Math.cos(pi/12) - (x1+size) * Math.sin(pi/12);

	console.log("box",x1,y1,x2,y2,x3,y3,x4,y4);

	// FIRST EXERCISE:
	// Modify the coordinates above so that they are rotated by 15 degrees to draw the box

	ctx.beginPath();  // We want to draw a line.
	ctx.moveTo(x1,y1);  // start at a corner upper left hand cornner
	ctx.lineTo(x2,y2);  // draw a line to the right
	ctx.lineTo(x3,y3); //  draw a line down
	ctx.lineTo(x4,y4); // draw a line left
	ctx.lineTo(x1,y1);       // Draw a line up and back to the start corner
	ctx.stroke(); // actually draw the line on the screen as a red line of thickness 2

	// This code fills the box green if ctl2 is being held down with the mouse.
	ctx.fillStyle = "green";
	if(gCtl2) ctx.fill();
}



function DummyExample()
{
	// Note two different libraries in use:
	// Math.sin(x)     --> buildin javascript Math library, capital M
	// math.matrix(3)  --> our 'math' library

	// This code shows how to use matrices
	var I = identity3(); // Creates a 3x3 identity matrix

	// Create a 3x3 rotation matrix that rotates about the z-axis by an angle of 45 degrees:
	var theta = Math.PI/4;  // computers use radians!
	var R = mat3(       [ Math.cos(theta),  -Math.sin(theta), 0 ],
						[ Math.sin(theta),   Math.cos(theta), 0 ],
						[ 0              ,   0              , 1 ]
						);

	console.log("R=",R);
	// make a column vector
	var v = vec3(2,2,5); // 2i + 3j + 5k

	// multiple I x R x v
	var v_rotated = R.mult(v);



	console.log("Dummy Example",v,v_rotated);
	console.log("R",R);
	console.log("identity",I.mult(R));
	console.log("identity",R.mult(I));
}

var eyedistance = 400
var screen = 200

function projector(p) {
	var xy = vec2(0,0);
	xy.x(screen * p(0)/(eyedistance + p(2)));
	xy.y(screen * p(1)/(eyedistance + p(2)));
	return xy;
}

var screen_distance = 400;
var eye_distance = 800;
function Project(p)
{

  // return the  x-y coordinates for a 3-vector
  var xy = vec2(0,0);
  xy[0] = p.x()/(p.z()+eye_distance)*screen_distance;
  xy[1] = p.y()/(p.z()+eye_distance)*screen_distance;
  return xy;
}

function MoveTo3d(p)
{
	var x = p.x()/(p.z()+eye_distance)*screen_distance;
  	var y = p.y()/(p.z()+eye_distance)*screen_distance;
	ctx.moveTo(x,y);
}
function LineTo3d(p)
{
	var x = p.x()/(p.z()+eye_distance)*screen_distance;
  	var y = p.y()/(p.z()+eye_distance)*screen_distance;
	ctx.lineTo(x,y);
}
function DrawCube(a,w,vx,vy,vz,color)
{
	var theta = w*gT;
	
	var R = mat4(       [ Math.cos(theta),  -Math.sin(theta), 0,0],
						[ Math.sin(theta),   Math.cos(theta), 0 ,0],
						[ 0              ,   0              , 1 ,0],
						[0               ,   0              , 0 ,1]
						);
	var T = mat4([1,0,0,vx*gT],[0,1,0,vy*gT],[0,0,1,vz*gT],[0,0,0,1]);
	if(color == 0) {
		ctx.strokeStyle = "blue";
	}
	if(color ==1) {
		ctx.strokeStyle = "red";
	}
	if(color == 2) {
		ctx.strokeStyle = "yellow";
	}
	if(color == 3) {
		ctx.strokeStyle = "black"
	}


	ctx.lineWidth = 2;

	// a is the half-width of the cube
	var p1 = R.mult(vec4(-a,-a,-a,1));           
	var p2 = R.mult(vec4(-a,+a,-a,1));           
	var p3 = R.mult(vec4(+a,+a,-a,1));           
	var p4 = R.mult(vec4(+a,-a,-a,1));           
	var p5 = R.mult(vec4(-a,-a,+a,1));           
	var p6 = R.mult(vec4(-a,+a,+a,1));           
	var p7 = R.mult(vec4(+a,+a,+a,1));           
	var p8 = R.mult(vec4(+a,-a,+a,1));  

	p1 = T.mult(p1);
	p2 = T.mult(p2);
	p3 = T.mult(p3);
	p4 = T.mult(p4);
	p5 = T.mult(p5);
	p6 = T.mult(p6);
	p7 = T.mult(p7);
	p8 = T.mult(p8); 

	
	
	ctx.beginPath();
	MoveTo3d(p1);
	LineTo3d(p2);
	LineTo3d(p3);
	LineTo3d(p4);
	LineTo3d(p1);
	MoveTo3d(p5);
	LineTo3d(p6);
	LineTo3d(p7);
	LineTo3d(p8);
	LineTo3d(p5);

	MoveTo3d(p1); LineTo3d(p5);
	MoveTo3d(p2); LineTo3d(p6);
	MoveTo3d(p3); LineTo3d(p7);
	MoveTo3d(p4); LineTo3d(p8);
	ctx.stroke();

	

}

function rotate(theta)
{
	mat4(Math.sin(theta),Math.cos(theta),0,Math.cos(theta),Math.sin(theta),0,0,0,1);
}
