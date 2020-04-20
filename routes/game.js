module.exports = game; 


function game(app, Game, rndstring){
    app.post('/gameFinish', async(req,res)=>{
        var new_game = new Game(req.body);
        new_game.musicToken = req.body.musicToken;
        try{
          var result = await new_game.save();
        }catch(e){
        }
        return res.status(200).json({message : "success!"});
      })

      app.post('/gameData/ranking/read/all', async(req,res)=>{
        let result = await Game.find().sort({ recordTotal : -1 });
        let list = []
        for (var i=0; result[i] != null; i++) {
            let json = {
                musicName : result[i].musicName,
                recordTotal : result[i].recordTotal,
                playedUser : result[i].playedUser,
                musicToken : result[i].musicToken
            }

            list.push(json)
        }
        return res.status(200).json({list : list})
    })
    app.post('/gameData/ranking/read/one', async(req,res)=>{
      let result = await Game.find({musicToken : req.body.musicToken}).sort({recordTotal : -1})
      let list = []
      for( var i = 0; result[i] != null; i++) {
          let json = {
            musicName : result[i].musicName,
            recordTotal : result[i].recordTotal,
            playedUser : result[i].playedUser,
            musicToken : result[i].musicToken
          }
          list.push(json)
      }
      return res.status(200).json( list )
  })
  app.post('/gameData/ranking/read/one/my', async(req,res)=>{
    let result = await Game.find({musicToken : req.body.musicToken, userToken : req.body.userToken}).sort({recordTotal : -1})
    let list = []
    for( var i = 0; result[i] != null; i++) {
        let json = {
          musicName : result[i].musicName,
          recordTotal : result[i].recordTotal,
          playedUser : result[i].playedUser,
          musicToken : result[i].musicToken
        }
        list.push(json)
    }
    return res.status(200).json( list )
})
app.post('/gameData/ranking/read/all/my', async(req,res)=>{
  let result = await Game.find({userToken : req.body.userToken}).sort({recordTotal : -1})
  let list = []
  for( var i = 0; result[i] != null; i++) {
      let json = {
        musicName : result[i].musicName,
        recordTotal : result[i].recordTotal,
        playedUser : result[i].playedUser,
        musicToken : result[i].musicToken
      }
      list.push(json)
  }
  return res.status(200).json( list )
})

}