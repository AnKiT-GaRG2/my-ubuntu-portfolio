import { useState } from 'react';
import { User, Lock, ChevronRight, Edit } from 'lucide-react';

export function UsersSettings() {
  const [autoLogin, setAutoLogin] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Users</h2>
        <button className="px-4 py-2 text-sm text-foreground hover:bg-muted/20 rounded-lg transition-colors">
          Add User...
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-ubuntu-window-header rounded-lg overflow-hidden">
        {/* Unlock Notice */}
        <div className="flex items-center justify-between p-4 bg-yellow-500/10 border-b border-yellow-500/20">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-yellow-500" />
            <div>
              <div className="text-sm font-medium text-foreground">
                Unlock to Add Users and Change Settings
              </div>
              <div className="text-xs text-muted-foreground">
                Some settings must be unlocked before they can be changed.
              </div>
            </div>
          </div>
          <button className="px-4 py-2 text-sm bg-muted/20 hover:bg-muted/30 text-foreground rounded-lg transition-colors">
            Unlock...
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 space-y-6">
          {/* Profile Picture and Name */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-muted/20">
                <img
                  src="/profilepic.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full bg-yellow-500 flex items-center justify-center text-2xl font-bold text-white">AG</div>';
                    }
                  }}
                />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-muted/80 hover:bg-muted rounded-full flex items-center justify-center transition-colors">
                <Edit className="w-4 h-4 text-foreground" />
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">Ankit Garg</h3>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>
          </div>

          {/* Authentication & Login Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Authentication & Login</h4>

            {/* Password Field */}
            <button className="w-full flex items-center justify-between p-3 bg-muted/10 hover:bg-muted/20 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Password</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">••••</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>

            {/* Automatic Login Toggle */}
            <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
              <div>
                <div className="text-sm font-medium text-foreground">Automatic Login</div>
                <div className="text-xs text-muted-foreground">
                  Log in without entering password
                </div>
              </div>
              <button
                onClick={() => setAutoLogin(!autoLogin)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  autoLogin ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    autoLogin ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Account Activity */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Account Activity</h4>
            <button className="w-full flex items-center justify-between p-3 bg-muted/10 hover:bg-muted/20 rounded-lg transition-colors">
              <span className="text-sm text-foreground">Account Activity</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Logged in</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          </div>

          {/* Remove User Button */}
          <div className="pt-4 border-t border-border/50">
            <button className="px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
              Remove User...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}