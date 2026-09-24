
let postsArray = [
[ "posts/2026-09-24-thought-no.-5.html" ],
[ "posts/2026-09-23-thought-no.-4.html" ],
[ "posts/2026-09-22-thought-no.-3.html" ],
[ "posts/2026-09-21-thought-no.-2.html" ],
[ "posts/2026-09-20-thought-no.-1.html" ] ];

let url = window.location.pathname;
const postDateFormat = /\d{4}\-\d{2}\-\d{2}\-/;
let relativePath = ".";
if ( url.includes("posts/") ) {
  relativePath = "..";
}

let currentIndex = -1;
let currentFilename = url.substring(url.lastIndexOf('posts/'));

if ( ! currentFilename.endsWith(".html") ) {
    currentFilename += ".html";
}
let i;
for (i = 0; i < postsArray.length; i++) {
  if ( postsArray[i][0] === currentFilename ) {
    currentIndex = i;
  }
}
function formatPostTitle(i) {
  if ( postsArray[i].length > 1 ) {
     return decodeURI(postsArray[i][1]);
  } else { 
 	if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
	  return postsArray[i][0].slice(17,-5).replace(/-/g," ");
    } else {
      return postsArray[i][0].slice(6,-5).replace(/-/g," ");
    }
  }
}

let currentPostTitle = "";
let niceDate = "";
if ( currentIndex > -1 ) {
  currentPostTitle = formatPostTitle( currentIndex );
  if (  postDateFormat.test ( postsArray[currentIndex][0].slice( 6,17 ) ) ) {
    let monthSlice = postsArray[currentIndex][0].slice( 11,13 );
    let month = "";
    if ( monthSlice === "01") { month = "jan";}
    else if ( monthSlice === "02") { month = "feb";}
    else if ( monthSlice === "03") { month = "mar";}
    else if ( monthSlice === "04") { month = "qpr";}
    else if ( monthSlice === "05") { month = "may";}
    else if ( monthSlice === "06") { month = "jun";}
    else if ( monthSlice === "07") { month = "jul";}
    else if ( monthSlice === "08") { month = "aug";}
    else if ( monthSlice === "09") { month = "sep";}
    else if ( monthSlice === "10") { month = "oct";}
    else if ( monthSlice === "11") { month = "nov";}
    else if ( monthSlice === "12") { month = "dec";}
	niceDate = postsArray[currentIndex][0].slice( 14,16 ) + " " + month + ", " + postsArray[currentIndex][0].slice( 6,10 );
  }
}

function formatPostLink(i) {
  let postTitle_i = "";
  if ( postsArray[i].length > 1 ) {
    postTitle_i = decodeURI(postsArray[i][1]);
  } else {
	if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
	  postTitle_i = postsArray[i][0].slice(17,-5).replace(/-/g," ");
    } else {
      postTitle_i = postsArray[i][0].slice(6,-5).replace(/-/g," ");
    }
  }
  if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
    return '<li>꒰ <a href="' + relativePath + '/'+ postsArray[i][0] +'">' + postsArray[i][0].slice(6,16) + " <br>　" + postTitle_i + '</a> ꒱</li>';
  } else {
    return '<li><a href="' + relativePath + '/'+ postsArray[i][0] +'">' + postTitle_i + '</a></li>';
  }
}

let postListHTML = "<ul>";
for ( let i = 0; i < postsArray.length; i++ ) {
  postListHTML += formatPostLink(i);
}
postListHTML += "</ul>";
let recentPostsCutoff = 4;
let recentPostListHTML = "<h2>dear diary ..</h2><ul>";
let numberOfRecentPosts = Math.min( recentPostsCutoff, postsArray.length );
for ( let i = 0; i < numberOfRecentPosts; i++ ) {
  recentPostListHTML += formatPostLink(i);
}
if ( postsArray.length > recentPostsCutoff ) {
  recentPostListHTML += '<li class="moreposts"><a href=' + relativePath + '/archive.html>+ more</a></li></ul>';
} else {
  recentPostListHTML += "</ul>";
}

let nextprevHTML = "";
let nextlink = "";
let prevlink = "";

if ( postsArray.length < 2 ) {
  nextprevHTML = '꒰ <a href="' + relativePath + '/index.html">home</a> ꒱';
} else if ( currentIndex === 0 ) {
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML = '<a href="'+ relativePath + '/' + prevlink +'">←</a> ꒰ <a href="' + relativePath + '/index.html">home</a> ꒱';
} else if ( currentIndex === postsArray.length - 1 ) {
  nextlink = postsArray[currentIndex - 1][0];
  nextprevHTML = '꒰ <a href="' + relativePath + '/index.html">home</a> ꒱<a href="' + relativePath + '/' + nextlink +'">→</a>';
} else if ( 0 < currentIndex && currentIndex < postsArray.length - 1 ) {
  nextlink = postsArray[currentIndex - 1][0];
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML = '<a href="' + relativePath + '/'+ prevlink +'">←</a> ꒰ <a href="' + relativePath + '/index.html">home</a> ꒱ <a href="' + relativePath + '/'+ nextlink +'">→</a>';
}


if (document.getElementById("nextprev")) {
  document.getElementById("nextprev").innerHTML = nextprevHTML;
}
if (document.getElementById("postlistdiv")) {
  document.getElementById("postlistdiv").innerHTML = postListHTML;
}
if (document.getElementById("recentpostlistdiv")) {
  document.getElementById("recentpostlistdiv").innerHTML = recentPostListHTML;
}
if (document.getElementById("header")) {
  document.getElementById("header").innerHTML = headerHTML;
}
if (document.getElementById("blogTitleH1")) {
  document.getElementById("blogTitleH1").innerHTML = blogTitle;
}
if (document.getElementById("postTitleH1")) {
  document.getElementById("postTitleH1").innerHTML = currentPostTitle;
}
if (document.getElementById("postDate")) {
  document.getElementById("postDate").innerHTML = niceDate;
}
if (document.getElementById("footer")) {
  document.getElementById("footer").innerHTML = footerHTML;
}


if (document.title === "") {
  document.title = currentPostTitle;
}