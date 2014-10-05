ig.module(
    'game.entities.soldier'
)
.requires(
    'impact.entity',
    'game.entities.link'
)
.defines(function(){
    Direction = {
        NA : "NA",
        Up : "Up",
        Down: "Down",
        Left: "Left",
        Right: "Right"
    }
    EntitySoldier = ig.Entity.extend({
        direction: Direction.NA, 
        stepsTakenInDirection: 0,
        stepsToWalkInDirection: 0,
        size: {x:32, y: 32},
        init: function(x,y,settings){
            this.parent(x,y,settings);
            this.addAnim('idle',1,[0]);
        },
        sign: function(x){
            if (x < 0) {
                return -1; 
            }
            else{
                return 1; 
            }
        },
        
        animSheet: new ig.AnimationSheet('media/soldier.png', 32, 32),
        update: function(){
            var link = ig.game.getEntitiesByType(EntityLink)[0];
            
            var myX = Math.floor(this.pos.x + this.size.x/2);
            var myY = Math.floor(this.pos.y + this.size.y/2);
            
            var linkX = Math.floor(link.pos.x + link.size.x/2);
            var linkY = Math.floor(link.pos.y + link.size.y/2);
            
            // follow link
            if (Math.abs(myX - linkX) < 10 || Math.abs(myY - linkY) < 10) {
                this.vel.x = 50 * (this.sign(linkX - myX)); 
                this.vel.y = 50 * (this.sign(linkY - myY));
                
                this.stepsToWalkInDirection = 0;
                this.stepsTakenInDirection = 0; 
            }
            else{ // choose a random direction
                if (this.stepsToWalkInDirection == 0) {
                    this.stepsToWalkInDirection = Math.floor(Math.random() * 25);
                    this.stepsTakenInDirection = 0;
                    
                    this.vel.x = 0;
                    this.vel.y = 0; 
                    
                    var directionNum = Math.floor(Math.random() * 4);
                    switch(directionNum){
                        case 0:
                            this.direction = Direction.UP;
                            break;
                        case 1:
                            this.direction = Direction.Down;
                            break;
                        case 2:
                            this.direction = Direction.Left;
                            break;
                        case 3:
                            this.direction = Direction.Right;
                            break;
                        default:
                            this.direction = Direction.NA;
                            break; 
                    }    
                }
                else if (this.stepsToWalkInDirection <= this.stepsTakenInDirection){
                    this.stepsToWalkInDirection = 0;
                    this.stepsTakenInDirection = 0; 
                }
                else{
                    this.stepsTakenInDirection++;
                    switch(this.direction){
                        case Direction.UP:
                            this.vel.y = -25;
                            break;
                        case Direction.Down:
                            this.vel.y = 25;
                            break;
                        case Direction.Left:
                            this.vel.x = -25;
                            break;
                        case Direction.Right:
                            this.vel.x = 25;
                            break;
                        case Direction.NA:
                            break; 
                    }
                }
            }
            this.parent();
        }
    })
})