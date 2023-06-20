
(function(object) {

    // waits for the document to be fully loaded (without images)
    document.observe('dom:loaded', function() {
        var cards = $$('div.card'), SIZE = 230, logos = $$('div.logo'), homepages = $$('div.page'), navs = $$('div.nav'), members = $$('img.band_member'), msg = $$('div.msg'),
      currentId = null, blocked = false, score = 0, tries = 0, currentPage = 0, currentNavId = 'homepage'; //, lightnings = $$('img.lightning')

        //        $(homepages[0]).hide();
        //        $(homepages[1]).hide();
        //        $(homepages[2]).hide();
        //        $(homepages[3]).hide();
        //        $(homepages[4]).hide();
        //        $(homepages[5]).hide();
        //        $(navs[0]).hide();

      //  $(homepages[1]).setAttribute('class', 'pageBand'); // the-band page 

        function urlForId(id) {
            switch (id) {
                case 1: return 'backinblack.jpg';
                default: return 'blackice.jpg';
            }
            //return 'picture_' + id + '.png';
        }

        // preload images $R(1,8) is like [1,2,3,4,5,6,7,8] (for this purpose)
        $R(1, 8).each(function(id) {
            var img = new Image();
            img.src = urlForId(id);
        });

        logo = new Image();
        logo.src = 'Thunderstruck Graphic Black Only.jpg';

        homeH = new Image(); homeH.src = 'homeH.jpg';
        homeR = new Image(); homeR.src = 'home.jpg';

        thebandH = new Image(); thebandH.src = 'thebandH.jpg';
        thebandR = new Image(); thebandR.src = 'theband.jpg';

        tourH = new Image(); tourH.src = 'tourH.jpg';
        tourR = new Image(); tourR.src = 'tour.jpg';

        musicH = new Image(); musicH.src = 'musicH.jpg';
        musicR = new Image(); musicR.src = 'music.jpg';

        photosH = new Image(); photosH.src = 'photosH.jpg';
        photosR = new Image(); photosR.src = 'photos.jpg';

        contactusH = new Image(); contactusH.src = 'contactusH.jpg';
        contactusR = new Image(); contactusR.src = 'contactus.jpg';

        geneH = new Image(); geneH.src = 'geneH.jpg';
        geneR = new Image(); geneR.src = 'gene.jpg';

        mikeH = new Image(); mikeH.src = 'mikeH.jpg';
        mikeR = new Image(); mikeR.src = 'mike.jpg';

        tonyH = new Image(); tonyH.src = 'tonyH.jpg';
        tonyR = new Image(); tonyR.src = 'tony.jpg';

        ozH = new Image(); ozH.src = 'ozH.jpg';
        ozR = new Image(); ozR.src = 'oz.jpg';

        joeH = new Image(); joeH.src = 'joeH.jpg';
        joeR = new Image(); joeR.src = 'joe.jpg';

        //lightning = new Image(); lightning.src = 'lightning.gif';

        // shuffle resets and shuffles the cards
        function shuffle(duration) {
            $('score').innerHTML = score = 0;
            $('tries').innerHTML = tries = 0;

            // randomize cards and reposition them randomly, in a 4x4 grid
            // 1. make sure all positions change place
            // this can take several iterations
            // [].concat() is used to create a copy of an array
            var currentOrder = [].concat(cards), matches = true;
            while (matches) {
                // zip combines two arrays into one
                // [1,2].zip(['a','b']) --> [[1, "a"], [2, "b"]]
                // this can be used to compare two arrays (in this case, find "any" matching pairs)
                cards = cards.sortBy(Math.random);
                matches = cards.zip(currentOrder).any(function(pair) { return pair[0] === pair[1]; });
            }

            function zIndexTransition(pos) { return pos > 0.8 ? 1 : 0; }
            function calculateTop(index) {
                return 200 + (1 - S2.FX.Transitions.mirror((index / (cards.length - 1)) * .7 + .15, S2.FX.Transitions.easeOutCirc)) * 300;
            }

            cards.sortBy(Math.random).each(function(card, index) {
                $(card).morph('top:-200px;margin-top:' + calculateTop(index) + 'px;left:' + (51 + (index * 20)) + 'px;z-index:' + index, {
                    propertyTransitions: { top: 'mirror', left: 'swingFromTo', zIndex: zIndexTransition },
                    delay: Math.random() * 1, duration: 1
                });
            });

            cards.sortBy(Math.random).each(function(card, index) {
                $(card).morph('margin-top:' + (((index / 4).floor() * 210) + 167) + 'px;left:' + (((index % 4) * 250) + 20) + 'px', {
                    propertyTransitions: { marginTop: 'easeOutCirc', left: 'linear' },
                    duration: 1, delay: index / 15
                });
            });

            var c1 = logos[0];
            $(c1).morph('top:0px', { delay: 4, transition: 'bounce', duration: 1 });

            cards.sortBy(Math.random).each(function(card, index) {
                $(card).morph('opacity: 0.4', { delay: 3, duration: 2 });

            });

            // $(homepages[0]).appear({ delay: 4, duration: 2 });
            //$(navs[0]).appear({ delay: 4, duration: 2 });
            $(navs[0]).morph('left:0px', { transition: 'bounce', duration: 1, delay: 4.3 });
            $(homepages[0]).morph('left:220px', { transition: 'bounce', duration: 1, delay: 4 });

			var amg = msg[0];
			$(amg).morph('left:220px', { transition: 'bounce', duration: 3, delay: 5 });
			
            //$(c1).morph('left:300px', { transition: 'bounce', duration: 2 });

            /*      
            // 2. animate cards to go to new positions
            cards.inGroupsOf(4).each(function(group, x) {
            group.each( function(card, y){
            flip(card, 'back.png');
            card.morph('opacity:1;left:'+(x*SIZE)+'px;top:'+(y*SIZE)+'px', {
            duration: duration || 2.5, transition: 'easeInOutQuint'
            });
            });
            });
            */
            // randomize cards, and assign the same picture id to each group of 2 cards
            cards.sortBy(Math.random).inGroupsOf(2).each(function(group, index) {
                group.invoke('store', 'picture_id', index + 1);
            });
        }


        function dispatchNav(event, element) {
            var k = element;
                        $('msgbox').hide();
                        $('bolt').show();
                        $('bolt').morph('width: 170px; left:385px', { transition: 'easeTo', duration: .3 });
                        $('bolt').morph('width: 85px; left:470px', { transition: 'easeFrom', duration: .3, delay: .3, after: function() { $('bolt').hide(); } });
            $(currentNavId + '_page').morph('left:-900px', { transition: 'easeTo', duration: .5, after: function() {
                currentNavId = element.id;
                $(currentNavId + '_page').show();
                $(currentNavId + '_page').morph('left:220px', { transition: 'bounce', duration: .5 });
                //alert('test');
            }
            });

            // roll- up and then out... caused weird text left-over problems
            //            $(currentNavId + '_page').morph('width:0px;left:200px;', {
            //                duration: .5, transition: 'easeInCubic',
            //                after: function() {
            //                    currentNavId = element.id;
            //                    $(currentNavId + '_page').morph('width:0px;left:200px;', { duration: .1, after: function() {
            //                        $(currentNavId + '_page').show();
            //                        $(currentNavId + '_page').morph('width:700px;left:200px', { duration: .5, transition: 'easeOutCubic' });
            //                    }
            //                    });
            //                }
            //            });

            //,               
            //                after: function() {
            //                    if ('back.png') img.src = image;
            //                    img.morph('width:140px;left:0px', {
            //                        duration: .2, transition: 'easeOutCubic'
            //                    });
            //                }
            //            });

            //            $(currentNavId).hide();
        }

        function flip(element, image) {
            var img = element.down('img');
            img.morph('width:0px;left:70px;', {
                duration: .2, transition: 'easeInCubic',
                after: function() {
                    if (image) img.src = image;
                    img.morph('width:140px;left:0px', {
                        duration: .2, transition: 'easeOutCubic'
                    });
                }
            });
        }

        function reveal(element) {
            // grab the picture id from Prototype's element storage system
            if (element.retrieve('picture_revealed')) return;
            var id = element.retrieve('picture_id'), img = element.down('img');
            element.store('picture_revealed', true);
            flip(element, urlForId(id));
            return id;
        }

        function hide(element) {
            if (!element.retrieve('picture_revealed')) return;
            var img = element.down('img');
            element.store('picture_revealed', false);
            flip(element, 'back.png');
        }

        function updatescore() {
            $('score').update(score).setStyle('color:#77a638').morph('color:#aaa', 2);
        }

        function win() {
            cards.each(function(card) {
                card.morph('opacity:1');
                flip(card, urlForId(card.retrieve('picture_id')));
                card.store('picture_revealed', false);
                card.morph('top:0px;margin-left:' + ((Math.random() * 50) - 25) + 'px', {
                    propertyTransitions: {
                        opacity: 'easeInOutQuart',
                        marginLeft: 'pulse',
                        top: 'bounce'
                    },
                    delay: 0.4 + Math.random() * 5,
                    duration: 3 + Math.random() * 7
                }).morph('opacity:0;top:-100px;margin-left:0', 2);
            });

            shuffle.delay(17);
        }

        function dispatchClick(event, element) {
            // don't accept click events while the UI is blocked
            if (blocked) return;

            if (!element.retrieve('picture_revealed')) {
                var id = reveal(element);

                $('tries').innerHTML = (++tries);

                // second card revealed, check if we have a matching card pair
                if (currentId) {
                    blocked = true;
                    // yes, up score and run nice animation to remove the cards
                    if (currentId == id) {
                        score++;
                        updatescore.delay(1);

                        (function() {
                            cards.findAll(function(card) {
                                return card.retrieve('picture_id') == id;
                            }).each(function(card) {
                                card.morph('opacity:0', {
                                    transition: 'pulse', duration: 1
                                });
                            });
                            blocked = false;
                        }).delay(0.5);

                        if (score == 8) win.delay(1.5);
                        // no, hide all cards (after 1 second)
                    } else {
                        (function() {
                            cards.each(function(card) { hide(card); });
                            blocked = false;
                        }).delay(1);
                    }
                    currentId = null;
                    // first card revealed
                } else {
                    currentId = id;
                }
            }
        }

		function carousel() {
		  var i;
		  var x = document.getElementsByClassName("mySlides");
		  for (i = 0; i < x.length; i++) {
			x[i].style.display = "none";  
		  }
		  myIndex++;
		  if (myIndex > x.length) {myIndex = 1}    
		  x[myIndex-1].style.display = "block";  
		  setTimeout(carousel, 2000); // Change image every 2 seconds
		}
		
        //$('field').on('click', 'div.card', dispatchClick);
        $('nav').on('click', 'div.navlink', dispatchNav);
        $('nav').on('mouseover', 'div.navlink', function(event, element) {
            switch (element.id) {
                case 'homepage': element.children[0].src = homeH.src; break;
                case 'theband': element.children[0].src = thebandH.src; break;
                case 'tour': element.children[0].src = tourH.src; break;
                case 'music': element.children[0].src = musicH.src; break;
                case 'photos': element.children[0].src = photosH.src; break;
                case 'contactus': element.children[0].src = contactusH.src; break;
            }
        });

        $('nav').on('mouseout', 'div.navlink', function(event, element) {
            switch (element.id) {
                case 'homepage': element.children[0].src = homeR.src; break;
                case 'theband': element.children[0].src = thebandR.src; break;
                case 'tour': element.children[0].src = tourR.src; break;
                case 'music': element.children[0].src = musicR.src; break;
                case 'photos': element.children[0].src = photosR.src; break;
                case 'contactus': element.children[0].src = contactusR.src; break;
            }
        });

        $('membernav').on('click', 'img.band_member', function(event, element) {
            var k = element;
            $('scrollband').scrollTo($(element.id + '_bio').offsetTop);
        });

        $('membernav').on('mouseover', 'img.band_member', function(event, element) {
            switch (element.id) {
                case 'gene': element.src = geneH.src; break;
                case 'mike': element.src = mikeH.src; break;
                case 'oz': element.src = ozH.src; break;
                case 'tony': element.src = tonyH.src; break;
                case 'joe': element.src = joeH.src; break;
            }
        });
        $('membernav').on('mouseout', 'img.band_member', function(event, element) {
            switch (element.id) {
                case 'gene': element.src = geneR.src; break;
                case 'mike': element.src = mikeR.src; break;
                case 'oz': element.src = ozR.src; break;
                case 'tony': element.src = tonyR.src; break;
                case 'joe': element.src = joeR.src; break;
            }
        });

		$('msgbox').on('click', 'div.msg', function(event, element) {
            var k = element;
			var a = $('div.tour_page');
            dispatchNav(event, $('tour'));
        });
		
        $('bolt').hide();
		
        shuffle();

        Object.extend(object, { shuffle: shuffle, win: win });
		
		var myIndex = 0; 
		carousel();
		
    });

})(window);