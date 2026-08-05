import { WorkExperience, EducationItem, SkillCategory, BankProject, ContactInfo } from '../types';
import portfolioJson from './portfolioData.json';
import boaDashboardImg from '../assets/images/boa_dashboard_preview_1785960701641.jpg';
import boaPythonImg from '../assets/images/boa_python_preview_1785960716595.jpg';
import boaWarehouseImg from '../assets/images/boa_warehouse_preview_1785960726157.jpg';
import homeWorkspaceImg from '../assets/images/home_workspace_bg_1785956069636.jpg';

const imageMap: Record<string, string> = {
  boaDashboardImg,
  boaPythonImg,
  boaWarehouseImg,
  homeWorkspaceImg
};

export const contactInfo: ContactInfo = portfolioJson.contactInfo as ContactInfo;

export const workExperiences: WorkExperience[] = portfolioJson.workExperiences.map((exp) => ({
  ...exp,
  imageUrl: exp.imageKey ? imageMap[exp.imageKey] : homeWorkspaceImg
})) as WorkExperience[];

export const educationList: EducationItem[] = portfolioJson.educationList as EducationItem[];

export const skillCategories: SkillCategory[] = portfolioJson.skillCategories as SkillCategory[];

export const bankProjects: BankProject[] = portfolioJson.bankProjects.map((p) => ({
  ...p,
  imageUrl: imageMap[p.imageKey] || homeWorkspaceImg
})) as BankProject[];
