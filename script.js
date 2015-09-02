$(function(){

  //from maing page to rock page
  $("#rock").click(function(){
    window.location.href="rock.html";
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
  var songIds = ["279812225", "266075284", "214403648", "379320577","296913969","485519684","296998263","280508710","214403584","3445766","169004107","352394","586705159"];
  /*console.log(_.sample(songIds));*/
  /*$("#guitar").hide();*/
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
        id: _.sample(songIds)
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
      $("#audio_preview")[0].play();
    });
  }
/*newSong();*/
  //check if guess is correct
  $("form").on("submit",function(e){
    e.preventDefault();
    song = $(".searchinput").val();
    console.log(song);
    if(artistName.includes(song) || albumName.includes(song) || trackName.includes(song)){
      $("#albumCover").attr("src",albumCover);
      $("#artistName").text(artistName);
      $("#trackName").text(trackName);
      $("#albumName").text(albumName);
      $(".info").show();
      countWin++;
      $("#parallelogram").text(countWin);
      /*$("#play").fadeOut();*/
      /*setTimeout(show, 1000);
      function show(){
        $("#guitar").fadeIn();
      }*/
      $(".play").fadeOut(function(){
        $(this).load(function(){
          $(this).fadeIn();
          $(this).removeClass("image").addClass("guitar");
          $(this).removeClass("play");
        });
        $(this).attr("src","guitar.png");
      });
      /*newSong();*/
    }
    else{
      counLose++;
      $("#parallelogram1").text(counLose);
      $(".play").fadeOut(function(){
        $(this).load(function(){
          $(this).fadeIn();
          $(this).removeClass("image")/*.addClass("guitar")*/;
          /*$(this).removeClass("play");*/
        });
        $(this).attr("src","wrong.png");
      });
    }
      //clear search
      $(".searchinput").val("");
      setTimeout(clearBord,2000);
      function clearBord(){
        console.log("you got it");
        $(".guitar").removeClass("guitar").addClass("play");//removed img class
        $(".info").hide();
        // .attr("src","play.png");
      }
  });

});



