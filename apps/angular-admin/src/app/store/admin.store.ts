import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

// Define the initial state interface
interface AdminState {
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
  dashboardStats: {
    totalOrders: number;
    totalUsers: number;
    totalRestaurants: number;
    totalRevenue: number;
  };
  isLoading: boolean;
  selectedMenuItem: string;
}

// Initial state
const initialState: AdminState = {
  user: null,
  dashboardStats: {
    totalOrders: 0,
    totalUsers: 0,
    totalRestaurants: 0,
    totalRevenue: 0
  },
  isLoading: false,
  selectedMenuItem: 'dashboard'
};

export const AdminStore = signalStore(
  { providedIn: 'root' },
  
  // Define the state
  withState(initialState),
  
  // Define computed values
  withComputed((store) => ({
    isUserLoggedIn: computed(() => store.user() !== null),
    dashboardSummary: computed(() => {
      const stats = store.dashboardStats();
      return `${stats.totalOrders} orders, ${stats.totalUsers} users, ${stats.totalRestaurants} restaurants`;
    }),
    userDisplayName: computed(() => store.user()?.name ?? 'Guest'),
  })),
  
  // Define methods (actions)
  withMethods((store) => ({
    // User authentication methods
    loginUser: (user: { name: string; email: string; role: string }) => {
      patchState(store, { user });
    },
    
    logoutUser: () => {
      patchState(store, { user: null });
    },
    
    // Dashboard stats methods
    updateDashboardStats: (stats: AdminState['dashboardStats']) => {
      patchState(store, { dashboardStats: stats });
    },
    
    incrementOrderCount: () => {
      const currentStats = store.dashboardStats();
      patchState(store, {
        dashboardStats: {
          ...currentStats,
          totalOrders: currentStats.totalOrders + 1
        }
      });
    },
    
    // UI state methods
    setLoading: (loading: boolean) => {
      patchState(store, { isLoading: loading });
    },
    
    setSelectedMenuItem: (menuItem: string) => {
      patchState(store, { selectedMenuItem: menuItem });
    },
    
    // Simulate data loading
    loadInitialData: async () => {
      patchState(store, { isLoading: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      patchState(store, {
        dashboardStats: {
          totalOrders: 1247,
          totalUsers: 8932,
          totalRestaurants: 156,
          totalRevenue: 45780
        },
        user: {
          name: 'Admin User',
          email: 'admin@fooddelivery.com',
          role: 'super-admin'
        },
        isLoading: false
      });
    }
  }))
);