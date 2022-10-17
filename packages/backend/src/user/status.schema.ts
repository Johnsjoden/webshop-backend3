import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { kundvagn } from './kundvagn.schema';

export class Status extends Document {
    @Prop()
    varukorg: []
    @Prop({ type: kundvagn })
    registrerad: kundvagn
    @Prop({ type: kundvagn })
    behandlas: kundvagn
    @Prop({ type: kundvagn })
    underleverans: kundvagn
    @Prop({ type: kundvagn })
    levererad: kundvagn
}