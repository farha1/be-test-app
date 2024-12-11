export const packageDistribution = (items: Array<any>) => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  
    // Sort items by price
    const sortedItems = items.sort((a, b) => a.price - b.price);
  
    // Initialize packages
    const packages = [];
    let currentPackage: { name: string; price: number; weight: number }[] = [];
    let currentWeight = 0;
    let currentPrice = 0;
  
    // Split items into packages
    for (let item of sortedItems) {
      if (currentPrice + item.price < 250) {
        // Check if adding this item keeps the weight balance reasonable
        if (currentWeight + item.weight <= totalWeight / (packages.length || 1)) {
          currentPackage.push(item);
          currentWeight += item.weight;
          currentPrice += item.price;
        } else {
          // Start a new package if weight distribution is off
          packages.push(currentPackage);
          currentPackage = [item];
          currentWeight = item.weight;
          currentPrice = item.price;
        }
      } else {
        // Start a new package if price exceeds limit
        packages.push(currentPackage);
        currentPackage = [item];
        currentWeight = item.weight;
        currentPrice = item.price;
      }
    }
  
    // Add the last package if not empty
    if (currentPackage.length > 0) {
      packages.push(currentPackage);
    }
  
    //   Display package details
    return packages;
  };
  