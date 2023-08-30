import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {
    console.log(question)
  },
}
test('create a question', async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(
    fakeQuestionsRepository,
  )

  const { question } = await createQuestionUseCase.execute({
    authorId: '1',
    title: 'New Question',
    content: 'Question Content',
  })

  expect(question.content).toEqual('Question Content')
  expect(question.id).toBeTruthy()
})
