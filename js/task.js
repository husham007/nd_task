/* A simple program that solves the most suitable (with most power) link station for a device at given
point [x,y].  */

class Point{
    constructor (x, y){
        this.x = x;
        this.y = y;
    }        
}
    
class LinkStation{

    constructor(loc_x, loc_y, reach){
       
        this.locX = loc_x;
        this.locY = loc_y;
        this.reach = reach;
    
       }

    distance(point_x, point_y){
        return Math.sqrt(Math.pow((this.locX - point_x),2) + Math.pow((this.locY - point_y),2))
    }

    power(point_x, point_y){
        let distance = this.distance(point_x, point_y);

        if (distance > this.reach)
            return 0
         else
            return (this.reach - distance) ** 2
    }

}
   

class LinkSelector{
    constructor(stations, points){
        this.stations = new Array();
        stations.forEach(station => {
            this.stations.push(new LinkStation(station[0], station[1], station[2])); 
        })
        this.points = new Array();
        points.forEach(point => {
            this.points.push(new Point(point[0], point[1]));
        })
        this.distanceMap = new Map();

    }

    findSuitable(){
        for (let point of this.points){
            for (let station of this.stations){
                if  (!(this.distanceMap.has(point))){
                    this.distanceMap.set(point,  [station.power(point.x, point.y), station])
                }
                else{
                    let power = station.power(point.x, point.y)
                    if (power > this.distanceMap.get(point)[0]){
                        this.distanceMap.set(point, [power, station])
                    }
                   
                }
            }
            if (this.distanceMap.get(point)[0] == 0){
                document.write(`No link station within reach for point (${point.x},${point.y})`);
                document.write('<br/>');
            }
            else{
                document.write(`Best link station for point (${point.x},${point.y}) is (${this.distanceMap.get(point)[1].locX},${this.distanceMap.get(point)[1].locY}) with power ${this.distanceMap.get(point)[0]}`);
                document.write('<br/>');
            }
           

        }
    }

}

const STATIONS = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];
const POINTS = [[0, 0], [100, 100], [15, 10], [18, 18]];

function result(){
    let selector = new LinkSelector(STATIONS, POINTS)
    selector.findSuitable()
    console.log('selector', selector)
}


