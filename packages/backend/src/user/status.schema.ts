import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Status extends Document {
    @Prop()
    varukorg: []
    @Prop()
    registrerad: []
    @Prop()
    behandlas: []
    @Prop()
    underleverans: []
    @Prop()
    levererad: []
}