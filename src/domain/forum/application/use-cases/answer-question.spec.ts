import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

describe('[AnswerQuestionUseCase]', () => {
  let inMemoryAnswersRepository: InMemoryAnswersRepository
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to answer an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Answer Content',
    })

    expect(answer.content).toEqual('Answer Content')
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
