import { create } from 'zustand';
import axios from 'axios';

const useTeamStore = create((set) => ({
  teamMembers: [],
  selectedMember: null,

  fetchTeamMembers: async (postId) => {
    try {
      const response = await axios.post(
        '/api/end_post',
        {
          postid: postId,
        },
        { withCredentials: true }
      );
      console.log('api response: ', response.data);
      set({ teamMembers: response.data });
    } catch (error) {
      // set({ teamMembers: null });
      console.error('Error fetching team members:', error);
    }
  },

  selectMember: (member) => set({ selectedMember: member }),
  deselectMember: () => set({ selectedMember: null }),
}));

export default useTeamStore;
