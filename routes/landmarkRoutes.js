var express = require('express');

var routes = function(Landmark) {
    var landmarkRouter = express.Router();

    /**
     @api {get} api/landmarks/ Get all landmarks
     @apiName Get all landmarks
     @apiGroup Landmark
     @apiDescription A route to get all the <code>Landmarks</code> in the database.

     @apiParam token <code>token</code> is required

     @apiSuccess landmark_collection All the <code>Landmarks</code> are shown

     @apiSuccessExample Example success response:
     {
     "landmarks": [
         {
           "_id": "5838564ede3e773f7d8bf538",
           "Name": "De eerste landmark is geboren",
           "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis feugiat lectus, nec feugiat neque scelerisque placerat. Aenean in diam vitae metus auctor tincidunt. Nullam posuere blandit felis, in rhoncus nulla pretium id. Fusce dapibus tellus nec ligula convallis rutrum. Quisque id elit commodo, varius nunc et, imperdiet velit. Nulla vel sapien ut odio pretium dictum. Curabitur a vehicula erat. Fusce leo neque, tincidunt at mattis sodales, malesuada in risus. Donec condimentum faucibus dui, nec fringilla nisl fringilla sed. Praesent cursus elit tempus tortor eleifend tristique. Duis sit amet arcu a turpis tincidunt varius. In semper, justo hendrerit dignissim pulvinar, mi lacus pretium leo, sit amet placerat nulla ligula nec metus. Aenean a dolor non mauris venenatis malesuada. Mauris sit amet risus felis. Nulla a odio interdum,cursus velit ut,fermentum nunc.Nam quis eleifend turpis.Mauris ultrices mi eu odio congue volutpat et in lacus.Fusce vel suscipit dolor,vehicula vestibulum lacus.Cras tempor hendrerit arcu,et efficitur felis placerat eu.Maecenas eget ultrices odio,sed interdum diam.Vivamus ligula purus,pharetra ac tincidunt non,accumsan at mauris.Vestibulum erat ante,condimentum ac dolor volutpat,tempus semper risus.Aliquam libero magna,aliquet a tempor sed,convallis vitae magna.Vestibulum velit urna,maximus et ex at,pulvinar venenatis nulla.Vestibulum viverra elementum nibh,et ultrices orci bibendum vel.Donec et tempor diam.Phasellus vulputate eget sapien vitae hendrerit.Sed posuere tincidunt mauris non ullamcorper.Nullam posuere felis rhoncus eros dapibus vehicula.Nunc imperdiet posuere lorem,sed vulputate massa convallis egetSed suscipit gravida leo ut imperdiet.Duis sed auctor ante,dignissim facilisis dui.Ut eget tortor vestibulum,pellentesque ante rutrum,elementum libero.Nulla ullamcorper sapien at lacus interdum mattis.Integer viverra nulla at libero elementum,et pharetra odio viverra.Phasellus a urna vitae lorem semper placerat.Mauris luctus blandit odio,scelerisque sollicitudin lorem viverra a.Maecenas ac nisl ac orci aliquam pulvinar a quis lectus.Praesent convallis lorem id ligula luctus pretium.Sed vehicula velit tortor,at facilisis nisi bibendum nec.Ut ac blandit enimMaecenas non lorem at tellus porttitor tempor.Morbi commodo arcu lorem,vitae ultricies arcu bibendum vel.Pellentesque feugiat elit in fringilla tristique.Ut maximus gravida fermentum.Curabitur porta ipsum nec mattis blandit.Vivamus molestie augue auctor massa aliquam volutpat.Aenean magna tortor,rutrum et diam quis,bibendum laoreet magna.In dignissim vitae ipsum eu sodales.Maecenas imperdiet tristique nibh nec vestibulum.Curabitur tincidunt consequat est,ac vehicula dolor pellentesque in .Vestibulum sapien dolor,fringilla sit amet varius in ,sollicitudin id enimAenean est sapien,iaculis et nunc dapibus,ullamcorper tincidunt est.Maecenas efficitur sagittis elit,quis dapibus erat vestibulum in .Etiam luctus nisi non purus viverra,at dictum ex hendrerit.Phasellus sollicitudin cursus vestibulum.Donec lacus ante,tristique vitae sapien sed,mattis dapibus lectus.Aliquam risus mi,ultrices ut lobortis a,cursus quis est.Etiam mollis rutrum purus.Aliquam mattis euismod turpis et convallis.Aenean in maximus enim,vel elementum dolor.",
           "Type": "Natuur",
           "Visits": 28,
           "Likes": 35,
           "Lat": 52,
           "Long": 54,
           "ImageURLBig": "http://static.tumblr.com/65162db388baaea011ad9b04912c0f58/ivguq93/wsGnlmsac/tumblr_static_91nsinx32eosw4kk8cg08s8o0_2048_v2.jpg"
         },
         {
           "_id": "583856c0de3e773f7d8bf53a",
           "Name": "De tweede landmark is ook een feit",
           "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis feugiat lectus, nec feugiat neque scelerisque placerat. Aenean in diam vitae metus auctor tincidunt. Nullam posuere blandit felis, in rhoncus nulla pretium id. Fusce dapibus tellus nec ligula convallis rutrum. Quisque id elit commodo, varius nunc et, imperdiet velit. Nulla vel sapien ut odio pretium dictum. Curabitur a vehicula erat. Fusce leo neque, tincidunt at mattis sodales, malesuada in risus. Donec condimentum faucibus dui, nec fringilla nisl fringilla sed. Praesent cursus elit tempus tortor eleifend tristique. Duis sit amet arcu a turpis tincidunt varius. In semper, justo hendrerit dignissim pulvinar, mi lacus pretium leo, sit amet placerat nulla ligula nec metus. Aenean a dolor non mauris venenatis malesuada. Mauris sit amet risus felis. Nulla a odio interdum,cursus velit ut,fermentum nunc.Nam quis eleifend turpis.Mauris ultrices mi eu odio congue volutpat et in lacus.Fusce vel suscipit dolor,vehicula vestibulum lacus.Cras tempor hendrerit arcu,et efficitur felis placerat eu.Maecenas eget ultrices odio,sed interdum diam.Vivamus ligula purus,pharetra ac tincidunt non,accumsan at mauris.Vestibulum erat ante,condimentum ac dolor volutpat,tempus semper risus.Aliquam libero magna,aliquet a tempor sed,convallis vitae magna.Vestibulum velit urna,maximus et ex at,pulvinar venenatis nulla.Vestibulum viverra elementum nibh,et ultrices orci bibendum vel.Donec et tempor diam.Phasellus vulputate eget sapien vitae hendrerit.Sed posuere tincidunt mauris non ullamcorper.Nullam posuere felis rhoncus eros dapibus vehicula.Nunc imperdiet posuere lorem,sed vulputate massa convallis egetSed suscipit gravida leo ut imperdiet.Duis sed auctor ante,dignissim facilisis dui.Ut eget tortor vestibulum,pellentesque ante rutrum,elementum libero.Nulla ullamcorper sapien at lacus interdum mattis.Integer viverra nulla at libero elementum,et pharetra odio viverra.Phasellus a urna vitae lorem semper placerat.Mauris luctus blandit odio,scelerisque sollicitudin lorem viverra a.Maecenas ac nisl ac orci aliquam pulvinar a quis lectus.Praesent convallis lorem id ligula luctus pretium.Sed vehicula velit tortor,at facilisis nisi bibendum nec.Ut ac blandit enimMaecenas non lorem at tellus porttitor tempor.Morbi commodo arcu lorem,vitae ultricies arcu bibendum vel.Pellentesque feugiat elit in fringilla tristique.Ut maximus gravida fermentum.Curabitur porta ipsum nec mattis blandit.Vivamus molestie augue auctor massa aliquam volutpat.Aenean magna tortor,rutrum et diam quis,bibendum laoreet magna.In dignissim vitae ipsum eu sodales.Maecenas imperdiet tristique nibh nec vestibulum.Curabitur tincidunt consequat est,ac vehicula dolor pellentesque in .Vestibulum sapien dolor,fringilla sit amet varius in ,sollicitudin id enimAenean est sapien,iaculis et nunc dapibus,ullamcorper tincidunt est.Maecenas efficitur sagittis elit,quis dapibus erat vestibulum in .Etiam luctus nisi non purus viverra,at dictum ex hendrerit.Phasellus sollicitudin cursus vestibulum.Donec lacus ante,tristique vitae sapien sed,mattis dapibus lectus.Aliquam risus mi,ultrices ut lobortis a,cursus quis est.Etiam mollis rutrum purus.Aliquam mattis euismod turpis et convallis.Aenean in maximus enim,vel elementum dolor.",
           "Type": "Natuur",
           "Visits": 25,
           "Likes": 20,
           "Lat": 52,
           "Long": 54,
           "ImageURLBig": "https://s-media-cache-ak0.pinimg.com/564x/e0/42/c1/e042c17835ae71c25bbf2510d0b31bb5.jpg"
         },
         {
           "_id": "583856d5de3e773f7d8bf53b",
           "Name": "De derde landmark is er ook",
           "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis feugiat lectus, nec feugiat neque scelerisque placerat. Aenean in diam vitae metus auctor tincidunt. Nullam posuere blandit felis, in rhoncus nulla pretium id. Fusce dapibus tellus nec ligula convallis rutrum. Quisque id elit commodo, varius nunc et, imperdiet velit. Nulla vel sapien ut odio pretium dictum. Curabitur a vehicula erat. Fusce leo neque, tincidunt at mattis sodales, malesuada in risus. Donec condimentum faucibus dui, nec fringilla nisl fringilla sed. Praesent cursus elit tempus tortor eleifend tristique. Duis sit amet arcu a turpis tincidunt varius. In semper, justo hendrerit dignissim pulvinar, mi lacus pretium leo, sit amet placerat nulla ligula nec metus. Aenean a dolor non mauris venenatis malesuada. Mauris sit amet risus felis. Nulla a odio interdum,cursus velit ut,fermentum nunc.Nam quis eleifend turpis.Mauris ultrices mi eu odio congue volutpat et in lacus.Fusce vel suscipit dolor,vehicula vestibulum lacus.Cras tempor hendrerit arcu,et efficitur felis placerat eu.Maecenas eget ultrices odio,sed interdum diam.Vivamus ligula purus,pharetra ac tincidunt non,accumsan at mauris.Vestibulum erat ante,condimentum ac dolor volutpat,tempus semper risus.Aliquam libero magna,aliquet a tempor sed,convallis vitae magna.Vestibulum velit urna,maximus et ex at,pulvinar venenatis nulla.Vestibulum viverra elementum nibh,et ultrices orci bibendum vel.Donec et tempor diam.Phasellus vulputate eget sapien vitae hendrerit.Sed posuere tincidunt mauris non ullamcorper.Nullam posuere felis rhoncus eros dapibus vehicula.Nunc imperdiet posuere lorem,sed vulputate massa convallis egetSed suscipit gravida leo ut imperdiet.Duis sed auctor ante,dignissim facilisis dui.Ut eget tortor vestibulum,pellentesque ante rutrum,elementum libero.Nulla ullamcorper sapien at lacus interdum mattis.Integer viverra nulla at libero elementum,et pharetra odio viverra.Phasellus a urna vitae lorem semper placerat.Mauris luctus blandit odio,scelerisque sollicitudin lorem viverra a.Maecenas ac nisl ac orci aliquam pulvinar a quis lectus.Praesent convallis lorem id ligula luctus pretium.Sed vehicula velit tortor,at facilisis nisi bibendum nec.Ut ac blandit enimMaecenas non lorem at tellus porttitor tempor.Morbi commodo arcu lorem,vitae ultricies arcu bibendum vel.Pellentesque feugiat elit in fringilla tristique.Ut maximus gravida fermentum.Curabitur porta ipsum nec mattis blandit.Vivamus molestie augue auctor massa aliquam volutpat.Aenean magna tortor,rutrum et diam quis,bibendum laoreet magna.In dignissim vitae ipsum eu sodales.Maecenas imperdiet tristique nibh nec vestibulum.Curabitur tincidunt consequat est,ac vehicula dolor pellentesque in .Vestibulum sapien dolor,fringilla sit amet varius in ,sollicitudin id enimAenean est sapien,iaculis et nunc dapibus,ullamcorper tincidunt est.Maecenas efficitur sagittis elit,quis dapibus erat vestibulum in .Etiam luctus nisi non purus viverra,at dictum ex hendrerit.Phasellus sollicitudin cursus vestibulum.Donec lacus ante,tristique vitae sapien sed,mattis dapibus lectus.Aliquam risus mi,ultrices ut lobortis a,cursus quis est.Etiam mollis rutrum purus.Aliquam mattis euismod turpis et convallis.Aenean in maximus enim,vel elementum dolor.",
           "Type": "Natuur",
           "Visits": 28,
           "Likes": 35,
           "Lat": 52,
           "Long": 54,
           "ImageURLBig": "https://secure.static.tumblr.com/24d4ebc658fa79d0f122a9d5612707a3/uhldxoo/wsGntmej1/tumblr_static_tumblr_static__640.jpg"
         }
       ]
       }

     @apiError No_token No <code>token</code> provided. <code>token</code> is required.
     @apiError Wrong_token Failed to authenticate <code>token</code>.
     @apiError db_error Statuscode <code>500</code> and <code>error</code> are returned.
     **/
    /**
     @api {post} api/landmarks/ Insert a Landmark
     @apiName Insert a Landmark
     @apiGroup Landmark
     @apiDescription A route insert a <code>Landmarks</code>.

     @apiParam Name The name of the new <code>Landmark</code>.
     @apiParam Description The description of the new <code>Landmark</code>.
     @apiParam Type The type of the new <code>Landmark</code>.
     @apiParam Lat The latitude of the new <code>Landmark</code>.
     @apiParam Long The longitude of the new <code>Landmark</code>.
     @apiParam ImageURLBig The image of the new <code>Landmark</code>.

     @apiSuccess status_code <code>201</code>
     @apiSuccess landmark_collection All the <code>Landmarks</code> are shown
     **/
    landmarkRouter.route('/')
        .post(function(req, res) {
            var landmark = new Landmark(req.body);

            landmark.save(function(err) {
                if (err) {
                    var errorMessage = err;
                    var message0 = "Missing: ";
                    if (errorMessage.errors.Name) message0 += "Name,";
                    if (errorMessage.errors.Description) message0 += "Description,";
                    if (errorMessage.errors.Type) message0 += "Type,";
                    if (errorMessage.errors.Lat) message0 += "Lat,";
                    if (errorMessage.errors.Long) message0 += "Long,";
                    if (errorMessage.errors.Country) message0 += "Country,";
                    if (errorMessage.errors.ImageURLBig) message0 += "ImageURLBig,";

                    var jsonfail = {
                        "awnser": "Failed to create json",
                        "message": message0
                    };
                    return res.status(406).json(jsonfail);
                } else {
                    var message = "id: " + landmark._id;
                    var json = {
                        "awnser": "Successfully created landmark",
                        "message": message
                    };
                    res.status(201).json(json);
                }
            });
        })
        .get(function(req, res) {

            var query = {};

            Landmark.find(query, function(err, landmarks) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json({
                        "landmarks": landmarks
                    });
            });
        });

    landmarkRouter.route('/filterlocatie')
        .get(function(req, res) {
            var query = {};

            if (req.query.Country) {
                if (req.query.Country) query.Country = req.query.Country;
            }

            Landmark.find(query, function(err, landmarks) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json({
                        "landmarks": landmarks
                    });
            });
        });

    /**
     @api {get} api/landmarks/location Get all landmarks (short)
     @apiName Get all landmarks (short)
     @apiGroup Landmark
     @apiDescription A route to get all the <code>Landmarks</code> in the database, with limited information.

     @apiParam token <code>token</code> is required

     @apiSuccess landmark_collection All the <code>Landmarks</code> are shown, with limited information (only id, lat and long are shown)

     @apiSuccessExample Example success response:
     {
     "landmarks": [
         {
           "_id": "5838564ede3e773f7d8bf538",
           "Lat": 52,
           "Long": 54,
         },
         {
           "_id": "583856c0de3e773f7d8bf53a",
           "Lat": 52,
           "Long": 54,
         },
         {
           "_id": "583856d5de3e773f7d8bf53b",
           "Lat": 52,
           "Long": 54,
         }
       ]
       }

     @apiError No_token No <code>token</code> provided. <code>token</code> is required.
     @apiError Wrong_token Failed to authenticate <code>token</code>.
     @apiError db_error Statuscode <code>500</code> and <code>error</code> are returned.
     **/
    landmarkRouter.route('/filterlocatieshort')
        .get(function(req, res) {

            var query = {};

            if (req.query.Country) {
                if (req.query.Country) query.Country = req.query.Country;
            }

            Landmark.find(query, {
                "Long": 1,
                "Lat": 1
            }, function(err, landmarks) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json({
                        "landmarks": landmarks
                    });
            });
        });

    landmarkRouter.use('/:landmarkId', function(req, res, next) {
        Landmark.findById(req.params.landmarkId, function(err, landmark) {
            if (err)
                res.status(500).send(err);
            else if (landmark) {
                req.landmark = landmark;
                next();
            } else {
                res.status(404).send('no landmark found');
            }
        });
    });

    landmarkRouter.route('/:landmarkId/addlike')
        .patch(function(req, res) {
            if (req.body._id)
                delete req.body._id;

            req.landmark.Likes = req.landmark.Likes + 1;

            req.landmark.save(function(err) {
                if (err)
                    return res.status(406).send("You can't like this landmark !!!");
                else {
                    return res.status(201).send("Congratulations, you are liker number: " + req.landmark.Likes.toString());
                }
            });
        });

    landmarkRouter.route('/:landmarkId/deletelike')
        .patch(function(req, res) {
            if (req.body._id)
                delete req.body._id;

            req.landmark.Likes = req.landmark.Likes - 1;

            req.landmark.save(function(err) {
                if (err)
                    return res.status(406).send("You can't like this landmark !!!");
                else {
                    return res.status(201).send("Congratulations, you are liker number: " + req.landmark.Likes.toString());
                }
            });
        });

    /**
     @api {get} api/landmarks/:landmarkId Get landmark by Id
     @apiName Get landmark by Id
     @apiGroup Landmark
     @apiDescription A route to get one <code>Landmark</code> from the database, based on given <code>Id</code>.

     @apiParam token <code>token</code> is required
     @apiParam id <code>id</code> is required to find one <code>Landmark</code>

     @apiSuccess landmark One <code>Landmark</code> is shown.

     @apiSuccessExample Example success response:
     {
     "landmarks": [
         {
           "_id": "583856d5de3e773f7d8bf53b",
           "Name": "De derde landmark is er ook",
           "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis feugiat lectus, nec feugiat neque scelerisque placerat. Aenean in diam vitae metus auctor tincidunt. Nullam posuere blandit felis, in rhoncus nulla pretium id. Fusce dapibus tellus nec ligula convallis rutrum. Quisque id elit commodo, varius nunc et, imperdiet velit. Nulla vel sapien ut odio pretium dictum. Curabitur a vehicula erat. Fusce leo neque, tincidunt at mattis sodales, malesuada in risus. Donec condimentum faucibus dui, nec fringilla nisl fringilla sed. Praesent cursus elit tempus tortor eleifend tristique. Duis sit amet arcu a turpis tincidunt varius. In semper, justo hendrerit dignissim pulvinar, mi lacus pretium leo, sit amet placerat nulla ligula nec metus. Aenean a dolor non mauris venenatis malesuada. Mauris sit amet risus felis. Nulla a odio interdum,cursus velit ut,fermentum nunc.Nam quis eleifend turpis.Mauris ultrices mi eu odio congue volutpat et in lacus.Fusce vel suscipit dolor,vehicula vestibulum lacus.Cras tempor hendrerit arcu,et efficitur felis placerat eu.Maecenas eget ultrices odio,sed interdum diam.Vivamus ligula purus,pharetra ac tincidunt non,accumsan at mauris.Vestibulum erat ante,condimentum ac dolor volutpat,tempus semper risus.Aliquam libero magna,aliquet a tempor sed,convallis vitae magna.Vestibulum velit urna,maximus et ex at,pulvinar venenatis nulla.Vestibulum viverra elementum nibh,et ultrices orci bibendum vel.Donec et tempor diam.Phasellus vulputate eget sapien vitae hendrerit.Sed posuere tincidunt mauris non ullamcorper.Nullam posuere felis rhoncus eros dapibus vehicula.Nunc imperdiet posuere lorem,sed vulputate massa convallis egetSed suscipit gravida leo ut imperdiet.Duis sed auctor ante,dignissim facilisis dui.Ut eget tortor vestibulum,pellentesque ante rutrum,elementum libero.Nulla ullamcorper sapien at lacus interdum mattis.Integer viverra nulla at libero elementum,et pharetra odio viverra.Phasellus a urna vitae lorem semper placerat.Mauris luctus blandit odio,scelerisque sollicitudin lorem viverra a.Maecenas ac nisl ac orci aliquam pulvinar a quis lectus.Praesent convallis lorem id ligula luctus pretium.Sed vehicula velit tortor,at facilisis nisi bibendum nec.Ut ac blandit enimMaecenas non lorem at tellus porttitor tempor.Morbi commodo arcu lorem,vitae ultricies arcu bibendum vel.Pellentesque feugiat elit in fringilla tristique.Ut maximus gravida fermentum.Curabitur porta ipsum nec mattis blandit.Vivamus molestie augue auctor massa aliquam volutpat.Aenean magna tortor,rutrum et diam quis,bibendum laoreet magna.In dignissim vitae ipsum eu sodales.Maecenas imperdiet tristique nibh nec vestibulum.Curabitur tincidunt consequat est,ac vehicula dolor pellentesque in .Vestibulum sapien dolor,fringilla sit amet varius in ,sollicitudin id enimAenean est sapien,iaculis et nunc dapibus,ullamcorper tincidunt est.Maecenas efficitur sagittis elit,quis dapibus erat vestibulum in .Etiam luctus nisi non purus viverra,at dictum ex hendrerit.Phasellus sollicitudin cursus vestibulum.Donec lacus ante,tristique vitae sapien sed,mattis dapibus lectus.Aliquam risus mi,ultrices ut lobortis a,cursus quis est.Etiam mollis rutrum purus.Aliquam mattis euismod turpis et convallis.Aenean in maximus enim,vel elementum dolor.",
           "Type": "Natuur",
           "Visits": 28,
           "Likes": 35,
           "Lat": 52,
           "Long": 54,
           "ImageURLBig": "https://secure.static.tumblr.com/24d4ebc658fa79d0f122a9d5612707a3/uhldxoo/wsGntmej1/tumblr_static_tumblr_static__640.jpg"
         }
       }


     @apiError No_token No <code>token</code> provided. <code>token</code> is required.
     @apiError Wrong_token Failed to authenticate <code>token</code>.
     @apiError Not_found Statuscode <code>404</code> and message "<code>no landmark found</code>" are returned.
     **/
    landmarkRouter.route('/:landmarkId')
        .get(function(req, res) {
            res.json(req.landmark);
        });

    return landmarkRouter;
};

module.exports = routes;
