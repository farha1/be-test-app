import { Request, Response } from "express";
import { db } from "../../database";
import { packageDistribution } from "./orderUtil";

const findCost = (weight: number, couriers: any) => {
  return couriers.find((c: any) => weight > c.lower && weight <= c.upper)?.cost;
};

export const placeOrder = async (req: Request, res: Response) => {
  const { ids } = req.body;
  const items = await db.products.findMany({
    where: {
      id: { in: ids },
    },
  });
  const couriers = await db.couriers.findMany();

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  if (totalPrice <= 250) {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const courierCost = findCost(totalWeight, couriers);
    const response = {
      courier_cost: courierCost,
      items: items,
    };
    res.json([response]);
    return;
  }

  const packages = packageDistribution(items);

  // add courier cost properties to packages
  const response = packages.map((p) => {
    const totalWeight = p.reduce((sum, item) => sum + item.weight, 0);
    const courierCost = findCost(totalWeight, couriers);

    return {
      courier_cost: courierCost,
      items: p,
    };
  });

  res.json(response);
};
