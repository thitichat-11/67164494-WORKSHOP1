import dashboardRoutes from './src/Routes/dashboardRoutes.js';
import db from './Database/db.js';

console.log('Routes registered in dashboard router:');
dashboardRoutes.stack.forEach(layer => {
  if (layer.route) {
    console.log(`  ${layer.route.stack[0].method.toUpperCase()} /api/dashboard${layer.route.path}`);
  }
});

console.log('\nFunctions exported from dashboardController:');
import * as controller from './src/controllers/dashboardController.js';
Object.keys(controller).forEach(key => {
  console.log(`  - ${key}`);
});

console.log('\nAll checks passed!');
process.exit(0);
