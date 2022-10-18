import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Products } from 'src/products/products.schema';
import { kundvagn } from './kundvagn.schema';

export class Status extends Document {
    @Prop({ type: Products })
    varukorg: Products[]
    @Prop({ type: kundvagn })
    registrerad: kundvagn
    @Prop({ type: kundvagn })
    behandlas: kundvagn
    @Prop({ type: kundvagn })
    underleverans: kundvagn
    @Prop({ type: kundvagn })
    levererad: kundvagn
}