import { Member } from "../models/member.model.js";
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
    const members = await Member.find();
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
    } = req.body.member;
    let oldMember = await Member.findById(id);
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
    const { id } = req.params;
    const currentYear = new Date().getFullYear();
    const currentYearList = await Selected.findOne({ year: currentYear });
    let member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    if (member.isArchived) {
      return res.status(404).json({ message: "Can not Select this member" });
    }
    if (!currentYearList) {
      const newSelected = new Selected({
        year: currentYear,
        selectedMembers: [{ memberId: id }],
      });
      await newSelected.save();
    } else {
      currentYearList.selectedMembers.push({ memberId: id });
      await currentYearList.save();
    }
    member = {
      ...member.toObject(),
      selected: true,
    };
    await MemberHistoryService.recordChange(
      member._id,
      {},
      `Member Selected for Year ${currentYear} `,
      req.user.id
    );
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
    let member = await Member.findById(id); // Find the member by id
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
    member.isArchived = true; // Set the isArchived field to true to archive the member record
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
    let member = await Member.findById(id);
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
    const { employeeName, delivered, deliveryDate, received } = req.body;
    const { id } = req.params;
    const member = await Member.findById(id);
    member.employeeName = employeeName;
    member.delivered = delivered;
    member.deliveryDate = deliveryDate;
    member.received = received;
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
