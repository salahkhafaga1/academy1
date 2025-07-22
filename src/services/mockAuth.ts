// Mock authentication service for demo purposes
export interface MockUser {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
}

const mockUsers: MockUser[] = [
  {
    uid: 'admin-001',
    email: 'admin@oli-al-absar.com',
    name: 'مدير النظام',
    role: 'admin'
  },
  {
    uid: 'teacher-001',
    email: 'teacher@oli-al-absar.com',
    name: 'الأستاذ أحمد',
    role: 'teacher'
  },
  {
    uid: 'student-001',
    email: 'student@oli-al-absar.com',
    name: 'محمد أحمد',
    role: 'student'
  }
];

let currentUser: MockUser | null = null;
let authStateListeners: ((user: MockUser | null) => void)[] = [];

export const mockAuth = {
  signInWithEmailAndPassword: async (email: string, password: string) => {
    // Mock authentication - accept any password for demo users
    const user = mockUsers.find(u => u.email === email);
    if (!user || password !== '123456') {
      throw new Error('Invalid credentials');
    }
    
    currentUser = user;
    // Notify listeners
    authStateListeners.forEach(listener => listener(currentUser));
    return { user };
  },

  signOut: async () => {
    currentUser = null;
    authStateListeners.forEach(listener => listener(null));
  },

  onAuthStateChanged: (callback: (user: MockUser | null) => void) => {
    authStateListeners.push(callback);
    // Immediately call with current state
    callback(currentUser);
    
    // Return unsubscribe function
    return () => {
      authStateListeners = authStateListeners.filter(listener => listener !== callback);
    };
  },

  getCurrentUser: () => currentUser
};

export const mockDb = {
  getDoc: async (docRef: any) => {
    if (currentUser) {
      return {
        exists: () => true,
        data: () => ({
          name: currentUser.name,
          role: currentUser.role
        })
      };
    }
    return {
      exists: () => false,
      data: () => null
    };
  }
};