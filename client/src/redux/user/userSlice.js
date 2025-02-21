import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialMember = {
  name: "",
  dob: "",
  phone: "",
  location: "",
  address: "",
  gifters: {
    EPCORN: false,
    FJQ: false,
    SFQ: false,
    STQ: false,
    SWT: false,
  },
  gifts: {
    foodHamper: "na",
    liquid: "na",
    gift: "na",
    additionalGifts: "",
  },
  company: "",
  info: "",
  deliveryStatus: {
    deliveryPerson: "",
    deliveryDate: "",
    confirmDelivery: false,
    onDeliveryNote: "",
  },
  isArchived: false,
};

const initialState = {
  currentUser: null,
  allUsers: [],
  allMembers: [],
  selected: [],
  scratchPad: initialMember,
  openModal: false,
  updateMode: false,
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
export const handleUnSelectMember = createAsyncThunk(
  "unselect/member",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/member/${data.id}/unselect`, {
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
export const archiveMember = createAsyncThunk(
  "archive/members",
  async (data, { rejectWithValue }) => {
    const { id, info } = data;
    try {
      const response = await fetch(`/api/v1/member/${id}/archive`, {
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
export const unarchiveMember = createAsyncThunk(
  "unarchive/members",
  async (data, { rejectWithValue }) => {
    const { id, info } = data;
    try {
      const response = await fetch(`/api/v1/member/${id}/unarchive`, {
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
export const dashboardData = createAsyncThunk(
  "dashboard/data",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`api/v1/member/reports/dashboard`);
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
export const getSelectedMembers = createAsyncThunk(
  "get/selectedMembers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`api/v1/member/get/selected`);
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
export const deliveryStatus = createAsyncThunk(
  "delivery/status",
  async (data, { rejectWithValue }) => {
    const { id, info } = data;
    try {
      const response = await fetch(`/api/v1/member/${id}/deliveryStatus`, {
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
export const getHistory = createAsyncThunk(
  "get/history",
  async (data, { rejectWithValue }) => {
    const { id } = data;
    try {
      const response = await fetch(`api/v1/member/${id}/get/history`);
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
    moveMemberToScratchPad: (state, { payload }) => {
      state.openModal = true;
      state.updateMode = true;
      state.scratchPad = state.allMembers.find((m) => m._id === payload);
      state.allMembers = state.allMembers.filter((m) => m._id !== payload);
    },
    copyToScratchPad: (state, { payload }) => {
      state.scratchPad = state.selected.find((m) => m._id === payload);
    },
    moveScratchPadToMemberList: (state) => {
      state.openModal = false;
      state.updateMode = false;
      state.allMembers = [...state.allMembers, state.scratchPad];
    },
    openScratchpad: (state) => {
      state.openModal = true;
    },
    closeScratchpad: (state) => {
      state.openModal = false;
      state.scratchPad = initialMember;
    },

    openUpdateMode: (state) => {
      state.updateMode = true;
    },
    closeUpdateMode: (state) => {
      state.updateMode = false;
    },
    handleInputs: (state, { payload }) => {
      const { name, value, parentKey } = payload;

      if (!parentKey) {
        state.scratchPad[name] = value;
      } else {
        state.scratchPad = {
          ...state.scratchPad,
          [parentKey]: {
            ...state.scratchPad[parentKey],
            [name]: value,
          },
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMember.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allMembers = [...state.allMembers, payload.data];
        state.allMembers.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        state.openModal = false;
        state.updateMode = false;
        state.scratchPad = initialMember;
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message, { autoClose: 1000 });
      })
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
      .addCase(getAllMembers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allMembers = payload.data;
        state.allMembers.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
      })
      .addCase(getAllMembers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleSelectMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSelectMember.fulfilled, (state, { payload }) => {
        state.loading = false;
        const memberIndex = state.allMembers.findIndex(
          (data) => data._id === payload.member._id
        );

        if (memberIndex !== -1) {
          state.allMembers[memberIndex] = {
            ...payload.member,
          };
        }

        state.allMembers.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        toast.success(payload.message, { autoClose: 1000 });
      })
      .addCase(handleSelectMember.rejected, (state) => {
        state.loading = false;
        //toast.error(payload);
      })
      .addCase(updateMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMember.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allMembers = [...state.allMembers, payload.member];
        state.allMembers.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        state.openModal = false;
        state.updateMode = false;
        state.scratchPad = initialMember;
      })
      .addCase(updateMember.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.message, { autoClose: 1000 });
      })
      .addCase(handleUnSelectMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleUnSelectMember.fulfilled, (state, { payload }) => {
        state.loading = false;
        const memberIndex = state.allMembers.findIndex(
          (data) => data._id === payload.member._id
        );

        if (memberIndex !== -1) {
          state.allMembers[memberIndex] = {
            ...payload.member,
          };
        }

        state.allMembers.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        toast.success(payload.message, { autoClose: 1000 });
      })
      .addCase(handleUnSelectMember.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.message, { autoClose: 1000 });
      })
      .addCase(unarchiveMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(unarchiveMember.fulfilled, (state, { payload }) => {
        state.loading = false;
        const memberIndex = state.allMembers.findIndex(
          (data) => data._id === payload.member._id
        );
        if (memberIndex !== -1) {
          state.allMembers[memberIndex] = {
            ...payload.member,
          };
        }
        state.allMembers.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        toast.success(payload.message, { autoClose: 1000 });
      })
      .addCase(unarchiveMember.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.message, { autoClose: 1000 });
      })
      .addCase(archiveMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(archiveMember.fulfilled, (state) => {
        state.loading = false;
        //Do not add fulfilled for this as we are doing in the memberForm
      })
      .addCase(archiveMember.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.message, { autoClose: 1000 });
      })
      .addCase(deliveryStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(deliveryStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        const memberIndex = state.selected.findIndex(
          (data) => data._id === payload.member._id
        );

        if (memberIndex !== -1) {
          state.selected[memberIndex] = {
            ...payload.member,
          };
        }

        state.selected.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        toast.success(payload.message, { autoClose: 1000 });
      })

      .addCase(deliveryStatus.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.message, { autoClose: 1000 });
      })
      .addCase(dashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(dashboardData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(dashboardData.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.message, { autoClose: 1000 });
      })
      .addCase(getSelectedMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSelectedMembers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.selected = payload.data;
      })
      .addCase(getSelectedMembers.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.message, { autoClose: 1000 });
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  handleLogout,
  signoutSuccess,
  openScratchpad,
  closeScratchpad,
  moveMemberToScratchPad,
  openUpdateMode,
  closeUpdateMode,
  handleInputs,
  moveScratchPadToMemberList,
  copyToScratchPad,
} = userSlice.actions;

export default userSlice.reducer;
