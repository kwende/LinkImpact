ig.module(
    'game.entities.link'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityLink = ig.Entity.extend({
        size: {x:32, y: 32},
        init: function(x,y,settings){
            this.parent(x,y,settings);
            this.addAnim('idle', 1, [0]);
        },
        animSheet: new ig.AnimationSheet('media/link.png', 32, 32),
        update: function(){
            if (ig.input.state('up')){
                this.vel.y = -100;
                this.vel.x = 0; 
            }
            else if (ig.input.state('down')) {
                this.vel.y = 100;
                this.vel.x = 0; 
            }
            else if (ig.input.state('left')) {
                this.vel.x = -100;
                this.vel.y = 0; 
            }
            else if(ig.input.state('right')){
                this.vel.x = 100;
                this.vel.y = 0; 
            }
            else{
                this.vel.y = 0;
                this.vel.x = 0; 
            }
            this.parent();
        }
    })
})