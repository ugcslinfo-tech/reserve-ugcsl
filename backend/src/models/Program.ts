import mongoose, { Schema, Document } from 'mongoose';

export interface IProgram extends Document {
  title: string;
  title_si: string;
  slug: string;
  faculty: string;
  faculty_si: string;
  degree: string;
  degree_si: string;
  duration: string;
  duration_si: string;
  description: string;
  description_si: string;
  icon: string;
  featured: boolean;
  overview: string;
  overview_si: string;
  modules: string[];
  modules_si: string[];
  outcomes: string[];
  outcomes_si: string[];
  careers: string[];
  careers_si: string[];
  requirements: string[];
  requirements_si: string[];
  fees: string;
  fees_si: string;
  intake: string;
  intake_si: string;
}

const ProgramSchema = new Schema<IProgram>({
  title: { type: String, required: true },
  title_si: { type: String, default: '' },
  slug: { type: String, required: true, unique: true },
  faculty: { type: String, required: true },
  faculty_si: { type: String, default: '' },
  degree: { type: String, required: true },
  degree_si: { type: String, default: '' },
  duration: { type: String, required: true },
  duration_si: { type: String, default: '' },
  description: { type: String, required: true },
  description_si: { type: String, default: '' },
  icon: { type: String, default: '🎓' },
  featured: { type: Boolean, default: false },
  overview: { type: String, default: '' },
  overview_si: { type: String, default: '' },
  modules: [{ type: String }],
  modules_si: [{ type: String }],
  outcomes: [{ type: String }],
  outcomes_si: [{ type: String }],
  careers: [{ type: String }],
  careers_si: [{ type: String }],
  requirements: [{ type: String }],
  requirements_si: [{ type: String }],
  fees: { type: String, default: '' },
  fees_si: { type: String, default: '' },
  intake: { type: String, default: '' },
  intake_si: { type: String, default: '' },
});

export default mongoose.model<IProgram>('Program', ProgramSchema);
