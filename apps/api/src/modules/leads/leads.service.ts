import {LeadsDto, LeadsUpdateDto} from '@huecrm/dto';
import {LeadsModel} from '@huecrm/mongoose-models';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';


@Injectable()
export class LeadsService {
	constructor(@InjectModel('Lead') private leadsModel: Model<LeadsModel>) {
	}
	
	async findAll(): Promise<LeadsModel[]> {
		return this.leadsModel.find().populate('owner');
	}
	
	async findOne(id: string): Promise<LeadsModel> {
		return this.leadsModel.findById(id).populate('owner');
	}
	
	async create(leadsDto: LeadsDto) {
		const lead = new this.leadsModel(leadsDto);
		await lead.save();
		return lead;
	}
	
	async update(id: string, leadsDto: LeadsUpdateDto): Promise<LeadsModel> {
		const lead = await this.leadsModel.findById(id);
		await lead.update(leadsDto);
		return lead;
	}
	
	async delete(email: string): Promise<LeadsModel> {
		const lead = await this.leadsModel.findOneAndDelete(email);
		await lead.remove();
		return lead;
	}
}