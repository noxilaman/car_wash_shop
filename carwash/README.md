# Car Wash Shop
This project use NodeJS ( Backend - Typescript, Express, Sequelize, JWT, Jest) + ReactJS + MySQL

## _Features_
- Auto Initial basedata.
- Admin part for manage BaseData.
- Add new wash car an monitoring.
- Dashboard Monitor in Waiting room.
- Wash car staff can change status after finish each station.
- Customer can monitor on mobile
- Cashier can store paid transaction

### _Admin - Features_
- Inital Base Data
- Manage User, Group, Car Size, Service, Pricing
### _Receiption - Features_
- Receive Car for washing (Enter information and take a photo)
### _Wash man - Features_
- Manage Activities
### _Cashier - Features_
- Paid Process
### _Customer - Features_
- Monitor task on mobile

## _Installation_
1. Create Database on MySQL
2. Create backend_nodejs/.env from .env.test and config database.
3. Create frontend_reactjs/.env from .env.test and config ip backend_nodejs api.
4. cd backend_nodejs and npm start
5. open browser http://<ip>:8086/api/initial for setup initial basedata.
6. open browser http://<ip>:8086/api/initial/usersetup for setup default user.
7. cd frontend_reactjs and npm start
8. open browser http://<ip>:3000/ and login by admin@admin.com / 12345678
9. Start Business.