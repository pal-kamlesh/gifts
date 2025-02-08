import { Member, MemberHistory } from "../models/member.model.js";
import Selected from "../models/selected.model.js";
import MemberHistoryService from "../utils/function.js";

export const addMember = async (req, res, next) => {
  try {
    const id = req.user.id;
    const {
      name,
      dob,
      address,
      phone,
      location,
      info,
      gift1,
      gift2,
      gift3,
      giftGiven,
      recived,
      company,
      employeeName,
      delivered,
      received,
      deliveryDate,
      isArchived,
    } = req.body;

    // Create new member instance
    let newMember = new Member({
      name,
      dob,
      address,
      phone,
      location,
      info,
      gift1,
      gift2,
      gift3,
      giftGiven,
      recived,
      company,
      employeeName,
      delivered,
      received,
      deliveryDate,
      isArchived,
      createdBy: id,
    });
    await newMember.save();

    newMember = await newMember.populate({
      path: "createdBy",
      select: "-password -_id -rights -__v",
    });
    // Save the new member
    newMember = await newMember.save();
    await MemberHistoryService.recordChange(
      newMember._id,
      newMember,
      "Member created",
      id
    );
    // Log the saved member object to verify the data
    res.status(200).json({ message: "Data Added", data: newMember });
  } catch (error) {
    next(error); // Handle any errors
  }
};

export const getMember = async (req, res, next) => {
  //send members with slected field set
  try {
    const members = await Member.find()
      .populate({ path: "createdBy", select: "-password -_id -rights -__v" })
      .populate({
        path: "history",
      });
    const sM = await Selected.findOne({}).limit(1);
    const selectedMemberIds = sM
      ? new Set(sM.selectedMembers.map((item) => item.memberId.toString()))
      : new Set([]);
    const memberWithSelctionStatus = members.map((member) => ({
      ...member.toObject(),
      selected: selectedMemberIds.has(member._id.toString()),
    }));
    res
      .status(200)
      .json({ message: "all members", data: memberWithSelctionStatus });
  } catch (error) {
    next(error);
  }
};
export const deleteMember = async (req, res, next) => {};

export const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      dob,
      address,
      phone,
      location,
      info,
      gift1,
      gift2,
      gift3,
      company,
      isArchived,
    } = req.body.scratchPad;
    let oldMember = await Member.findById(id).populate({
      path: "createdBy",
      select: "-password -_id -rights -__v",
    });
    if (!oldMember) {
      res.status(404).json({ message: "No such member found!" });
    }
    oldMember.name = name;
    oldMember.dob = dob;
    oldMember.address = address;
    oldMember.phone = phone;
    oldMember.location = location;
    oldMember.info = info;
    oldMember.gift1 = gift1;
    oldMember.gift2 = gift2;
    oldMember.gift3 = gift3;
    oldMember.company = company;
    oldMember.isArchived = isArchived;
    oldMember.createdBy = req.user.id;
    await oldMember.save();
    await MemberHistoryService.recordChange(
      oldMember._id,
      oldMember,
      "Member updated",
      req.user.id
    );
    res.status(200).json({ message: "Member updated", member: oldMember });
  } catch (error) {
    next(error);
  }
};

export const selectMember = async (req, res, next) => {
  try {
    const { id } = req.params; // Member ID from request params
    const currentYear = new Date().getFullYear(); // Get current year

    // Find the current year's selected list
    let currentYearList = await Selected.findOne();

    // Check if the member exists
    let member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Check if the member is archived
    if (member.isArchived) {
      return res.status(400).json({ message: "Cannot select this member" });
    }

    // If no list exists for the current year, create a new one
    if (!currentYearList) {
      currentYearList = new Selected({
        year: currentYear,
        selectedMembers: [{ memberId: id }],
      });
      await currentYearList.save();
    } else {
      // Check if the member is already in the list
      const isAlreadySelected = currentYearList.selectedMembers.some(
        (m) => m.memberId.toString() === id
      );

      if (isAlreadySelected) {
        return res.status(400).json({ message: "Member is already selected" });
      }

      // Add the member if they are not already in the list
      currentYearList.selectedMembers.push({ memberId: id });
      await currentYearList.save();
    }

    // Add `selected: true` flag to the response
    member = {
      ...member.toObject(),
      selected: true,
    };

    // Record the selection in MemberHistoryService
    await MemberHistoryService.recordChange(
      member._id,
      {},
      `Member selected for year ${currentYear}`,
      req.user.id
    );

    // Send response
    res.status(200).json({ message: "Member selected", member });
  } catch (error) {
    next(error);
  }
};

export const unSelectMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentYearList = await Selected.findOne();

    if (!currentYearList) {
      return res.status(404).json({ message: "List not found" });
    }

    if (
      currentYearList.selectedMembers.some(
        (member) => member.memberId.toString() === id.toString()
      )
    ) {
      currentYearList.selectedMembers = currentYearList.selectedMembers.filter(
        (member) => member.memberId.toString() !== id.toString()
      );
      await currentYearList.save();

      let member = await Member.findById(id);
      if (member) {
        member.selected = false;
        await member.save();
        await MemberHistoryService.recordChange(
          member._id,
          {},
          `Member remove from Year ${currentYearList.year} List`,
          req.user.id
        );
        res.status(200).json({ message: "Member Removed", member });
      } else {
        res.status(404).json({ message: "Member not found" });
      }
    } else {
      res.status(404).json({ message: "Member not found in selected list" });
    }
  } catch (error) {
    next(error);
  }
};

export const archiveMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    let member = await Member.findById(id).populate({
      path: "createdBy",
      select: "-password -_id -rights -__v",
    });
    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }
    const currentList = await Selected.findOne();
    if (currentList.selectedMembers.some((m) => m.memberId.toString() === id)) {
      res
        .status(404)
        .json({ message: "Member is selected can't Archive now!" });
      return;
    }
    member.isArchived = true;
    member.gift1 = "";
    member.gift2 = "";
    member.gift3 = "";
    member.employeeName = "";
    member.delivered = false;
    member.received = false;
    await member.save(); // Save the member record
    await MemberHistoryService.recordChange(
      member._id,
      member,
      "Member Archived",
      req.user.id
    );
    res.status(200).json({ message: "Member archived", member });
  } catch (error) {
    next(error);
  }
};
export const unArchive = async (req, res, next) => {
  try {
    const { id } = req.params;
    let member = await Member.findById(id).populate({
      path: "createdBy",
      select: "-password -_id -rights -__v",
    });
    if (!member) {
      res.status(404).json({ message: "Member not found" });
    }
    if (!member.isArchived) {
      res.status(404).json({ message: "Member is already unarchived" });
    }
    member.isArchived = false;
    await member.save();
    await MemberHistoryService.recordChange(
      member._id,
      member,
      "Member UnArchived",
      req.user.id
    );
    res.status(200).json({ message: "Member unarchived", member });
  } catch (error) {
    next(error);
  }
};

export const updateDelivery = async (req, res, next) => {
  try {
    const { deliveryPerson, confirmDelivery, onDeliveryNote, deliveryDate } =
      req.body;
    const { id } = req.params;
    const member = await Member.findById(id).populate({
      path: "createdBy",
      select: "-password -_id -rights -__v",
    });
    member.deliveryPerson = deliveryPerson;
    member.confirmDelivery = confirmDelivery;
    member.deliveryDate = deliveryDate;
    member.onDeliveryNote = onDeliveryNote;
    await member.save();
    await MemberHistoryService.recordChange(
      member._id,
      member,
      "Updated Delivery Info",
      req.user.id
    );
    res.status(200).json({ message: "Delivery Status updated", member });
  } catch (error) {
    next(error);
  }
};

export const dashboardData = async (req, res, next) => {
  try {
    const totalMember = await Member.countDocuments();
    const archivedMember = await Member.countDocuments({
      isArchived: true,
    });
    const giftsDelivered = await Member.countDocuments({
      delivered: true,
      isArchived: false,
    });
    const pendingDelivered = await Member.countDocuments({
      delivered: false,
      isArchived: false,
    });

    const [result] = await Selected.aggregate([
      {
        $project: {
          _id: 0,
          selectedCount: { $size: "$selectedMembers" },
        },
      },
    ]);
    const selectedMember = result?.selectedCount || 0;

    const giftCounts = await Selected.aggregate([
      // Step 1: Unwind the selectedMembers array to process each member individually
      { $unwind: "$selectedMembers" },

      // Step 2: Join with the Member collection to fetch gift data
      {
        $lookup: {
          from: "members", // Name of the Member collection (case-sensitive)
          localField: "selectedMembers.memberId",
          foreignField: "_id",
          as: "memberData",
        },
      },

      // Step 3: Unwind the memberData array (result of $lookup)
      { $unwind: "$memberData" },

      // Step 4: Combine gift fields (gift1, gift2, gift3) into a single array
      {
        $project: {
          allGifts: [
            "$memberData.gift1",
            "$memberData.gift2",
            "$memberData.gift3",
          ],
        },
      },

      // Step 5: Unwind the allGifts array to flatten it
      { $unwind: "$allGifts" },

      // Step 6: Filter out null/undefined gifts (optional)
      { $match: { allGifts: { $exists: true, $ne: null } } },

      // Step 7: Group by gift name and count occurrences
      {
        $group: {
          _id: "$allGifts",
          count: { $sum: 1 },
        },
      },

      // Step 8: Sort by count (descending)
      { $sort: { count: -1 } },
    ]);

    res.json({
      totalMember,
      archivedMember,
      giftsDelivered,
      pendingDelivered,
      selectedMember,
      giftCounts,
    });
  } catch (error) {
    next(error);
  }
};

export const selectedMembers = async (req, res, next) => {
  try {
    const selectedMembers = await Selected.findOne()
      .populate({
        path: "selectedMembers.memberId",
      })
      .lean();
    // Case 1: No data found
    if (!selectedMembers) {
      return res
        .status(404)
        .json({ success: false, message: "No selected members found." });
    }
    const transformedArray = selectedMembers.selectedMembers.map((item) => ({
      ...item.memberId,
    }));
    res.status(200).json({ success: true, data: transformedArray });
  } catch (error) {
    next(error);
  }
};
export const getHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await MemberHistory.find({ memberId: id });
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
