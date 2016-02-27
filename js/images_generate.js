var details = [{name:"Ayush Agarwal",year:13},{name:"Saurabh Mathur",year:14},{name:"Karan Pittie",year:13},{name:"Ayush Agarwal",year:13},{name:"Saurabh Mathur",year:14},{name:"Karan Pittie",year:13}]


for (var i = 0; i< details.length; i++) {
 var Tname = details[i].name.toLowerCase().replace(" ","");
 var year = details[i].year;
col=document.createElement("div");
	col.className="col s12 m4 l3";
frame=document.createElement("div");
	frame.className="avatar-frame1";
image=document.createElement("img");
	image.src="http://res.cloudinary.com/ieeecsvit/image/upload/c_crop,g_face,w_200,h_200/members/"+year+"/"+Tname+".png";
card=document.createElement("div");
	card.className="avatar-card";
names=document.createElement("h6");
	names.innerHTML=details[i].name;

frame.appendChild(image);
col.appendChild(frame);
card.appendChild(names);
col.appendChild(card);

document.getElementById('Avatar').appendChild(col);
};