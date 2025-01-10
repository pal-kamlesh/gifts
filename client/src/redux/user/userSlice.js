import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  currentUser: null,
  allUsers: [],
  error: null,
  loading: false,
};
export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const register = createAsyncThunk(
  "register/user",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateUser = createAsyncThunk(
  "update/user",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateMember = createAsyncThunk(
  "update/member",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/member/${data.id}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUsers = createAsyncThunk(
  "get/users",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user");
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "delete/user",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/user/${data}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllMembers = createAsyncThunk(
  "get/members",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/member/get`);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const handleSelectMember = createAsyncThunk(
  "select/member",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/member/${data.id}/select`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const addMember = createAsyncThunk(
  "add/members",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/member/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const editMember = createAsyncThunk(
  "add/members",
  async (data, { rejectWithValue }) => {
    const { id, info } = data;
    try {
      const response = await fetch(`/api/v1/member/${id}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.currentUser = null;
      window.localStorage.removeItem("persist:root");
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message, { autoClose: 1000 });
        state.currentUser = action.payload.result;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message, { autoClose: 1000 });
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message, { autoClose: 1000 });
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allUsers = payload.result;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message, { autoClose: 1000 });
      })
      .addCase(getAllMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMembers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getAllMembers.rejected, (state) => {
        state.loading = false;
        //toast.error(payload);
      })
      .addCase(addMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addMember.rejected, (state) => {
        state.loading = false;
        //toast.error(payload);
      })
      .addCase(handleSelectMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSelectMember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleSelectMember.rejected, (state) => {
        state.loading = false;
        //toast.error(payload);
      })
      .addCase(updateMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMember.rejected, (state) => {
        state.loading = false;
        //toast.error(payload);
      });
  },
});

// Action creators are generated for each case reducer function
export const { handleLogout, signoutSuccess } = userSlice.actions;

export default userSlice.reducer;
