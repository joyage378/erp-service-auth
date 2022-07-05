try{
    var createError = require('http-errors');
    var express = require('express');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');
    
    var requireHeader = require('require-header');
    var cors = require('cors')
    
    var app = express();
    
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    
    app.use(logger('dev'));
    app.use(express.json({limit: '30mb'}));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.use(cors())
    
    app.use(requireHeader('x-tenant-domain','Tenant domain not found in the request'));
    app.use(requireHeader('x-tenant-id','Tenant ID not found in the request'));
    
    var router = express.Router();
    var openRouter = express.Router();
    
    require('./routes/index').authRouter(router);
    require('./routes/index').openRouter(openRouter);
    
    app.use('/erpservicesauth/api/erp', router);
    app.use('/erpservicesauth/api/open/erp', openRouter);  // This router dont need Authorization-token, only required X-TENANT-ID & X-TENANT-DOMAIN (13-july)
    
    app.use(function(req, res, next) {
      next(createError(404));
    });
    
    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      console.log("Error Occured for ", err);
      return res.status(400).json({
        success: false,
        message: err.toString()
    });
    });
    
    process.on('uncaughtException', (err) => {
      console.error("uncaughtException", err);
    });
    process.on('unhandledRejection', (reason, promise) => {
      console.error("unhandledRejection", reason, " promise ", promise);
    });
    
    var port = process.env.PORT || 4000;
    app.listen(port);
    console.log("Server started at port::"+port);
    
    }catch(err){
      console.log("[ERP] Error ===> ",  err);
    }
    