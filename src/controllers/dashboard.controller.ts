import { NextFunction, Request, Response } from 'express';
import dashboardService from '@services/dashboard.service';


class DashboardController {
  public dashboardService = new dashboardService();

  public listDashboardItems = async (req: Request, res: Response, next: NextFunction) => {
    try {


      const getDashboard = await this.dashboardService.listDashboardItems();
     
       res.status(200).json({ getDashboard, statusCode: 200 });
    } catch (error) {
        console.log('error: ', error);
      next(error);
    }
  };

}

export default DashboardController;
