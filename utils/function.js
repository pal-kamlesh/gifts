import { MemberHistory } from "../models/member.model.js";

class MemberHistoryService {
  /**
   * Records changes made to a member's information
   * @param {string} memberId - The ID of the member
   * @param {Object} oldState - Previous state of the member
   * @param {string} message - Description of the change
   * @param {string} author - Name or ID of the person making the change
   */
  static async recordChange(memberId, oldState, message, author) {
    try {
      const memberHistory = await MemberHistory.findOne({ memberId });

      if (!memberHistory) {
        // Create new history record if none exists
        await MemberHistory.create({
          memberId,
          changes: [
            {
              oldState,
              message,
              author,
            },
          ],
        });
      } else {
        // Add to existing history
        memberHistory.changes.push({
          oldState,
          message,
          author,
        });
        await memberHistory.save();
      }
    } catch (error) {
      console.error("Error recording member history:", error);
      throw error;
    }
  }

  /**
   * Get complete history for a member
   * @param {string} memberId - The ID of the member
   * @returns {Promise<Array>} Array of changes sorted by timestamp
   */
  static async getMemberHistory(memberId) {
    try {
      const history = await MemberHistory.findOne({ memberId });
      if (!history) return [];

      return history.changes.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error("Error fetching member history:", error);
      throw error;
    }
  }

  /**
   * Get changes made by a specific author
   * @param {string} memberId - The ID of the member
   * @param {string} author - Author to filter by
   */
  static async getChangesByAuthor(memberId, author) {
    try {
      const history = await MemberHistory.findOne({ memberId });
      if (!history) return [];

      return history.changes
        .filter((change) => change.author === author)
        .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error("Error fetching changes by author:", error);
      throw error;
    }
  }

  /**
   * Get changes made within a date range
   * @param {string} memberId - The ID of the member
   * @param {Date} startDate - Start date for the range
   * @param {Date} endDate - End date for the range
   */
  static async getChangesByDateRange(memberId, startDate, endDate) {
    try {
      const history = await MemberHistory.findOne({ memberId });
      if (!history) return [];

      return history.changes
        .filter(
          (change) =>
            change.timestamp >= startDate && change.timestamp <= endDate
        )
        .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error("Error fetching changes by date range:", error);
      throw error;
    }
  }

  /**
   * Search changes by message content
   * @param {string} memberId - The ID of the member
   * @param {string} searchTerm - Term to search for in messages
   */
  static async searchChangesByMessage(memberId, searchTerm) {
    try {
      const history = await MemberHistory.findOne({ memberId });
      if (!history) return [];

      return history.changes
        .filter((change) =>
          change.message.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error("Error searching changes:", error);
      throw error;
    }
  }
}

export default MemberHistoryService;
