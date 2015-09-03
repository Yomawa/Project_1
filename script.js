$(function(){

  //from maing page to rock page
  $("#rock").click(function(){
    window.location.href="rock.html";
  });
  //funk page
$("#funk").click(function(){
    window.location.href="funk.html";
  });
//80s
$("#s80").click(function(){
  window.location.href="80s.html";
});

//90s
$("#s90").click(function(){
  window.location.href="90s.html";
});
//alternative
$("#alternative").click(function(){
  window.location.href="alternative.html";
});
//alternative
$("#jazz").click(function(){
  window.location.href="jazz.html";
});
  //back arrow
  $("#back").click(function(){
    window.location.href="index.html";
  });
  
  //ROCK PAGE
  //songIds
  var artistName;
  var albumName;
  var albumCover;
  var urlSong;
  var song;
  var trackName;
  var countWin=0;
  var counLose=0;
  var songIds;
  var songNinesIds;
  var songEightsIds;
  var songFunkIds;
  var songJazzIds;
  var songAlerIds;
  var pick;
  var nextPage;


  var category = location.href.split("/")[location.href.split("/").length-1].split(".")[0];



   //it its alternative
  songAlerIds = ["931563426","669285168","931563411","931563693"," 931563437","669285167","555694745","152267584","422478211","555694740","435761212","624200160","485468352"];
  //if its 90s
  songNinesIds = ["251101872","840431935","211394225","251101859","251101506","710463202","696112916","726255689","726255700","301645534","889308917"];
  //if its 80s
  songEightsIds = ["159293848","159294478","159294060","159294311","159293312","159294296","159294429","159294551","159293419","850697815"];
  //if its funk use these song Ids
  songFunkIds = ["360737330","365016817","360737389","360738359","360737773","365016813","366393279","1636432","1636445","362396"];

  // if its jazz use these song Ids
  songJazzIds = ["451344269","451344258","717552728","717552731","724185076","717552728","717552724","717552729","724185076","73987","529587955","282803097","308766"];
  
  // if its rock use these song Ids
  songIds = ["279812225", "266075284", "214403648", "379320577","296913969","485519684","296998263","280508710","214403584","3445766","169004107","352394","586705159"];
  

  //you have location href 
  if (category === "rock"){
    pick=songIds;
    nextPage="funk";
  }
  else if (category === "funk"){
   pick=songFunkIds;
   nextPage="alternative";
  }
  else if(category === "jazz"){
    pick=songJazzIds;
    nextPage="80s";
  }
  else if(category==="80s"){
   pick=songEightsIds;
   nextPage="90s";
  }
  else if (category ==="90s"){
    pick=songNinesIds;
    nextPage="index";
  }
  else if(category==="alternative"){
    pick=songAlerIds;
    nextPage="jazz";
  }

//next arrow
  $("#next").click(function(){
    window.location.href=nextPage+".html";
  });
 
  //click button
  $(".play").click(function(){
   newSong();
   $(".play").addClass("image");
  });
  function newSong(){
    $.ajax({
      url:"https://itunes.apple.com/us/lookup",
      jsonp: "callback",
      dataType: "jsonp",
      data:{
        id: _.sample(pick)
      }
    }).done(function(data){
      console.log(data);
      artistName = data.results[0].artistName;
      albumName = data.results[0].collectionName;
      albumCover = data.results[0].artworkUrl100;
      urlSong = data.results[0].previewUrl;
      trackName = data.results[0].trackName;
      console.log(artistName);
      console.log(albumName);
      console.log(albumCover);
      console.log(trackName);
      $("#audio_preview").attr("src",urlSong);
      //it has to be index of [0]because it refers to audio_preview that is in my html
      $("#audio_preview")[0].play();
    });
  }
/*newSong();*/
  //check if guess is correct
  $("form").on("submit",function(e){
    //prevents from refresing the browser
    e.preventDefault();
    //getting a value from input and saving in a varialbe song
    song = $(".searchinput").val();
    console.log(song);
    if(artistName.includes(song) || albumName.includes(song) || trackName.includes(song)){
      $("#albumCover").attr("src",albumCover);
      $("#artistName").text(artistName);
      $("#trackName").text(trackName);
      $("#albumName").text(albumName);
      //it shows all albumCover,artistName,trackName,albumName at once
      $(".info").show();
      //counts all my wins and adding at in my global var countWin
      countWin++;
      //whatever 
      $("#parallelogram").text(countWin);
      // for fading out at another time...
      var search = $(".searchinput");

      // I want to fade out the input as well
      // but when I use the .add method 
      // it runs the function twice!  
        // once for each thing that was faded out
        // TODO - FIX THIS!

      $(".play").fadeOut(function(){
        /*$(this).load(function(){*/
         /* $(".searchinput").fadeOut();*/
          // $(this) refers to the Image tag!
          $(this).fadeIn();
          $(this).removeClass("image").addClass("guitar");
          $(this).removeClass("play");
       /* });*/
        $(this).attr("src","guitar.png");
      });
      /*newSong();*/
    }
    else{
      counLose++;
      $("#parallelogram1").text(counLose);
      $(".play").fadeOut(function(){
        // $(this).load(function(){
          $(this).fadeIn();
          $(this).removeClass("image").addClass("wrong");
          $(this).removeClass("play");
        // });
        $(this).attr("src","wrong.png");
      });
    }
      //clear search
      $(".searchinput").val("");
      setTimeout(clearBord,3000);
          function clearBord(){
            console.log("you got it");

        $(".main").removeClass("guitar wrong").addClass("play");//removed img class, main is just there so we can find it
        $(".info").hide();
        // .attr("src","play.png");
      }
  });
});



