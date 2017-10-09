import mongoose, { Schema }  from 'mongoose'
import World from '../model/World'
import Player from '../model/Player'
import layoutSchema from '../model/Layout'

export default {
    method: 'POST',
    path:'/layout',
    handler: function (request, reply) {
        const newLayouts = JSON.parse(request.payload)
        console.log(request)
        console.log(request.params)
        const { pl, w, a} = request.params.query
        console.log(newLayouts)
        console.log({ pl, w, a})
        // TODO test w to be a real world!!!

        World.findOne({name: w}, (err, world) => {
            if(err) console.log(err)
            if(!world) world = new World({name: w})     //create new player on this world
            world.players
        })

        Player.findOne({name: pl}, (err, player) => {
            if(err) reply(err)
            player.worlds.map(world => {
                if(world === w) {
                    const Layout = mongoose.model(`layouts-${w}`, layoutSchema)
                    Object.keys(newLayouts).map(key => {
                        const {x, y} = newLayouts[key]
                        Layout.find({x, y}, (err, layout)=> {
                            if(err) console.log(err)
                            if(layout) {
                                // test if layout has change
                                if(layout.layout !== newLayouts[key].layout) Layout.update(newLayouts[key])
                            } else {
                                Layout.create(newLayouts[key])
                            }
                        })
                    })
                }
            })
        })

        return reply(1);
    }
}