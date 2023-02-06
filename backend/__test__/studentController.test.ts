import {
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "./../src/controllers/studentController";
import { Request, Response } from "express";
import { createStudent } from "../src/controllers/studentController";
import { Student } from "../src/models/Student";
import * as StudentServices from "../src/services/studentServices";

describe("Student Constroller test", () => {
  const mockNextFuction = jest.fn();
  const response = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.send = jest.fn().mockReturnThis();
    return res;
  };

  describe("Create student controller test", () => {
    const user = {
      PersonID: 3,
      PersonName: "test",
      PersonGender: "test",
      PersonAddress: "test",
      PersonMobileNo: "test",
      DateOfBirth: new Date(),
    } as Student;
    const request_add = {
      body: {
        data: user,
      },
    } as Request;
    const request_add_fail = {
      body: {},
    } as  Request;
    const res_add = response();

    it("test create student", async () => {
      const spyAddStudent = jest
        .spyOn(StudentServices, "createStudentService")
        .mockResolvedValue(user);
      await createStudent(request_add, res_add, mockNextFuction);
      expect(spyAddStudent).toBeCalledWith(user);
      spyAddStudent.mockRestore();
    });
    it("test create student fail", async () => {
      const spyAddStudent = jest
        .spyOn(StudentServices, "createStudentService")
        .mockResolvedValue(user);
      try {
        await createStudent(request_add_fail, res_add, mockNextFuction);
      } catch (e) {
        expect(e).toEqual(new Error("Error in creating student"));
      }
      spyAddStudent.mockRestore();
    });
  });

  describe("Update student controller test", () => {
    const user = {
      PersonID: 3,
      PersonName: "test",
      PersonGender: "test",
      PersonAddress: "test",
      PersonMobileNo: "test",
      DateOfBirth: new Date(),
    } as Student;
    const request_add = {
      body: {
        data: user,
      },
    } as Request;
    const request_add_fail = {
      body: {
        data: null,
      },
    } as Request;
    const res_add = response();

    it("test update student", async () => {
      const spyUpdateStudent = jest
        .spyOn(StudentServices, "createStudentService")
        .mockResolvedValue(user);
      await updateStudent(request_add, res_add, mockNextFuction);
      expect(spyUpdateStudent).toBeCalledWith(user);
      expect(spyUpdateStudent).toHaveBeenCalled();
      expect(spyUpdateStudent).toHaveBeenCalledTimes(1);
      spyUpdateStudent.mockRestore();
    });
    it("test update student fail", async () => {
      const spyAddStudent = jest
        .spyOn(StudentServices, "createStudentService")
        .mockResolvedValue(user);
      try {
        await updateStudent(request_add_fail, res_add, mockNextFuction);
      } catch (e) {
        expect(e).toEqual(new Error("Error in creating student"));
      }
      spyAddStudent.mockRestore();
    });
  });
  describe("delete student controller test", () => {
  const user = {
      PersonID: 3,
      PersonName: "test",
      PersonGender: "test",
      PersonAddress: "test",
      PersonMobileNo: "test",
      DateOfBirth: new Date(),
    } as Student;
    const id = 1;
    const request_add = {
      params: {
        id: "1",
      },
    } as unknown as Request;
    const request_add_fail = {
      params: {
        id: null,
      },
    } as unknown as Request;
    const res_add = response();
    const mockNextFuction = jest.fn();
    it("test delete student success", async () => {
      const spyAddStudent = jest
        .spyOn(StudentServices, "deleteStudentService")
        .mockResolvedValue(user);
      await deleteStudent(request_add, res_add, mockNextFuction);
      expect(spyAddStudent).toBeCalledWith(id);
      expect(spyAddStudent).toHaveBeenCalled();
      expect(spyAddStudent).toHaveBeenCalledTimes(1);
      spyAddStudent.mockRestore();
    });
    it("test delete student fail", async () => {
      const spyAddStudent = jest
        .spyOn(StudentServices, "deleteStudentService")
        .mockResolvedValue(user);
      try {
        await deleteStudent(request_add_fail, res_add, mockNextFuction);
      } catch (e) {
        expect(e).toEqual(new Error("Error in creating student"));
      }
      spyAddStudent.mockRestore();
    });
  });
  describe("get student controller test", () => {
    const users = [{
      PersonID: 3,
      PersonName: "test",
      PersonGender: "test",
      PersonAddress: "test",
      PersonMobileNo: "test",
      DateOfBirth: new Date(),
    }] as Student[];
    const mockNextFuction = jest.fn();
    const request_add = {} as Request;
    const res_add = response();

    it("test get student", async () => {
      const spyAddStudent = jest
        .spyOn(StudentServices, "getAllStudentsService")
        .mockResolvedValue(users);
    await getAllStudents(request_add, res_add, mockNextFuction);
      expect(spyAddStudent).toBeCalledWith();
      expect(spyAddStudent).toHaveBeenCalled();
      expect(spyAddStudent).toHaveBeenCalledTimes(1);
      spyAddStudent.mockRestore();
    });
    it("test get student fail", async () => {
      const spyGetStudent = jest
        .spyOn(StudentServices, "getAllStudentsService")
    
      try {
        await getAllStudents(request_add, res_add, mockNextFuction);
      } catch (e) {
        expect(e).toEqual('fsdfds');
      }
      spyGetStudent.mockRestore();
    });
  });
});
