import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("test /api/v1/", () => {
    describe("POST /user/requestedPlayer", () => {
        // Test to get all students record
        it("should get all students record", (done) => {
            chai.request(app)
                .get('/api/v1/user/requestedPlayer')
                .end((err, res) => {
                    console.log(res.body)
                    res.body.should.be.a('object');
                    res.should.have.status(401);
                    done();
                });
        });

    });
});
