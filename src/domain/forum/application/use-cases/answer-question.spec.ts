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
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Answer Content',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answer)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
