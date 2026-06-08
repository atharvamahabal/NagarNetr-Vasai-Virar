const COMPLAINTS_KEY = 'nagarnetr_complaints';

export const getComplaints = () => {
  const data = localStorage.getItem(COMPLAINTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveComplaint = (complaint) => {
  const complaints = getComplaints();
  const newComplaint = {
    ...complaint,
    id: `PMC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    date: new Date().toISOString(),
    status: 'pending',
  };
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify([newComplaint, ...complaints]));
  return newComplaint;
};

export const updateComplaintStatus = (id, status) => {
  const complaints = getComplaints();
  const updated = complaints.map(c => c.id === id ? { ...c, status } : c);
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(updated));
};
