const cars = require('../controllers/car.controller')

describe('Car Handlers', function () {

    test('create test empty license_code', async () => {
        const req = { body: {
            license_code: '',
            city: 'test' ,
            car_size_id: 1,
            note: 'test',
        } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.create(req, res);
        
        expect(res.statusdata).toEqual(400);
        expect(res.msg).toEqual({message: "license_code can not be empty!",});
    });

    test('create test empty city', async () => {
        const req = { body: {
            license_code: 'test',
            city: '',
            car_size_id: 1,
            note: 'test',
        } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.create(req, res);
        
        expect(res.statusdata).toEqual(400);
        expect(res.msg).toEqual({message: "city can not be empty!",});
    });

    test('create test empty car_size_id', async () => {
        const req = { body: {
            license_code: 'test',
            city: 'test' ,
            car_size_id: null,
            note: 'test',
        } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.create(req, res);
        
        expect(res.statusdata).toEqual(400);
        expect(res.msg).toEqual({message: "Car size can not be empty!",});
    });

    test('create test empty note',async () => {
        const req = { body: {
            license_code: 'test2',
            city: 'test2' ,
            car_size_id: 1,
            note: '',
        } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.create(req, res);
        
        expect(res.statusdata).toEqual(400);
        expect(res.msg).toEqual({
              "message": "Already have prices!",
             });
    });

    test('create test normal',async () => {
        var d = new Date,
        dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
        const req = { body: {
            license_code: 'test2'+dformat,
            city: 'test2' ,
            car_size_id: 1,
            note: '',
        } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.create(req, res);
        
        expect(res.statusdata).toEqual(200);
        expect(res.msg).not.toEqual({});
    });

    test('findAll normal',async () => {
        const req = { query: {
            license_code: '',
        } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.findAll(req, res);
        
        expect(res.statusdata).toEqual(200);
        expect(res.msg).not.toEqual({});
    });

    test('findAll empty license_code',async () => {
        const req = { query: {
           } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.findAll(req, res);
        
        expect(res.statusdata).toEqual(200);
        expect(res.msg).not.toEqual({});
    });

    test('findOne empty id',async () => {
        const req = { params: {
           } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.findOne(req, res);
        
        expect(res.statusdata).toEqual(404);
        expect(res.msg).toEqual({"message": "Cannot find Car with id=undefined.",});
    });

    test('findOne empty id 0 ',async () => {
        const req = { params: {
            id: 0
           } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.findOne(req, res);
        
        expect(res.statusdata).toEqual(404);
        expect(res.msg).toEqual({"message": "Cannot find Car with id=0.",});
    });

    test('findOne empty id 5 ',async () => {
        const req = { params: {
            id: 5
           } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.findOne(req, res);
        
        expect(res.statusdata).toEqual(200);
        expect(res.msg).not.toEqual({});
    });

    test('findOne empty id 80000 ',async () => {
        const req = { params: {
            id: 80000
           } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.findOne(req, res);
        
        expect(res.statusdata).toEqual(404);
        expect(res.msg).toEqual({"message": "Cannot find Car with id=80000.",});
    });

    test('update empty id and not send req.body ',async () => {
        const req = { params: {
           } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.update(req, res);
        
        expect(res.statusdata).toEqual(400);
        expect(res.msg).toEqual({"message": "id can not be empty!",});
    });

    test('update empty id = ""  not send req.body ',async () => {
        const req = { params: {
            id: ""
           } };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.update(req, res);
        
        expect(res.statusdata).toEqual(400);
        expect(res.msg).toEqual({"message": "id can not be empty!",});
    });

    test('update empty id and send req.body ',async () => {
        const req = { 
            params: {
            },
            body: {

            }
        };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.update(req, res);
        
        expect(res.statusdata).toEqual(400);
        expect(res.msg).toEqual({"message": "id can not be empty!",});
    });

    test('update empty id = ""  not send req.body ',async () => {
        const req = { params: {
            id: ""
           },
           body: {

           }
        };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.update(req, res);
        
        expect(res.statusdata).toEqual(400);
        expect(res.msg).toEqual({"message": "id can not be empty!",});
    });

    test('update empty id = 5 not send req.body ',async () => {
        const req = { params: {
            id: 5
           },
           body: {

           }
        };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.update(req, res);
        
        expect(res.statusdata).toEqual(400);
        expect(res.msg).toEqual({"message": "license_code can not be empty!",});
    });
    
    test('update id = 5 send req.body ',async () => {
        const req = { params: {
            id: 5
           },
           body: {
            license_code: 'update3'
           }
        };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.update(req, res);
        
        expect(res.statusdata).toEqual(200);
        expect(res.msg).toEqual({"message": "Car was updated successfully.",});
    });

    test('update id = 6 send duplicate license_code ',async () => {
        var d = new Date,
        dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
        const req = { params: {
            id: 6
           },
           body: {
            license_code: 'update'+dformat
           }
        };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.update(req, res);
        
        expect(res.statusdata).toEqual(200);
        expect(res.msg).toEqual({"message": "Car was updated successfully.",});
    });

    test('update id = 8000 send duplicate license_code ',async () => {
        var d = new Date,
        dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
        const req = { params: {
            id: 8000
           },
           body: {
            license_code: 'update'+dformat
           }
        };

        const res = { msg: {},statusdata: 0,
            send: function(input) { this.msg = input } ,
            status: function(input) { this.statusdata = input } 
        };
        await cars.update(req, res);
        
        expect(res.statusdata).toEqual(400);
        expect(res.msg).toEqual({"message": "Car was updated successfully.",});
    });

});