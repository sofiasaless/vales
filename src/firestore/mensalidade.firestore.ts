import { addDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { RestauranteSerivce } from "../auth/restaurante.service";
import { COLLECTIONS } from "../enums/firebase.enum";
import { Mensalidade, MensalidadePostRequestBody } from "../schema/mensalidade.schema";
import { PatternFirestore } from "./pattern.firestore";

export class MensalidadeFirestore extends PatternFirestore {
  private readonly restauranteService = new RestauranteSerivce()

  constructor() {
    super(COLLECTIONS.MENSALIDADE)
  }

  async criar(idRest: string) {
    const bodyToSave = {
      data_vencimento: new Date(),
      valor: 89.99,
      link: '00020126650014br.gov.bcb.pix0122widneylima21@gmail.com0217Vales Restaurante520400005303986540589.905802BR5919ANTONIO WIDNEY LIMA6007QUIXADA62290525ir4M3OOFrhJ6aecfiGxP5pz9L63042448',
      data_criacao: new Date(),
      restaurante_ref: doc(this.setup(), idRest),
      status: 'PENDENTE'
    }
    await addDoc(this.setup(), bodyToSave);
  }

  async listar(idRest: string) {
    try {
      const querySnap = await getDocs(
        query(
          this.setup(),
          where("restaurante_ref", "==", this.restauranteService.getRef(idRest)),
          orderBy("data_vencimento", "desc")
        )
      )

      const mensalidades: Mensalidade[] = querySnap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
          restaurante_ref: doc.data().restaurante_ref?.id || '',
        } as Mensalidade
      })

      return mensalidades
    } catch (error) {
      console.error(error)
    }
  }
}

export const mensalidadeFirestore = new MensalidadeFirestore()